import Image from 'next/image';
import { useState } from 'react';

import type { PlayerInfo, InventoryItem } from '@/features/game-session/model/types';
import ItemTooltip from '@/features/game-session/ui/item-tooltip';
import { getSafeImageUrl, handleImageError } from '@/shared/utils/image-utils';

const statIconMap: Record<string, string> = {
  strength: '/assets/힘.svg',
  intelligence: '/assets/지능.svg',
  agility: '/assets/민첩.svg',
  luck: '/assets/행운.svg',
};

interface PlayerSidebarProps {
  playerInfo: PlayerInfo;
  inventory: InventoryItem[];
  onUseItem?: (itemId: string) => void;
  onDropItem?: (itemId: string) => void;
  onToggleEquipItem?: (itemId: string) => void;
  isProcessing?: boolean;
}

const PlayerSidebar = ({ playerInfo, inventory, onUseItem, onDropItem, onToggleEquipItem, isProcessing = false }: PlayerSidebarProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  const stats = [
    { key: 'strength', value: playerInfo.strength, label: '힘' },
    { key: 'agility', value: playerInfo.agility, label: '민첩' },
    { key: 'intelligence', value: playerInfo.intelligence, label: '지능' },
    { key: 'luck', value: playerInfo.luck, label: '행운' },
  ];

  // HP 최대값을 100으로 가정 (API에서 최대값이 없으므로)
  const maxHP = 100;
  const maxEXP = playerInfo.level * 100; // 레벨 기반 경험치 최대값

  // 인벤토리 슬롯 (6개 고정)
  const inventorySlots = Array.from({ length: 6 }, (_, index) => inventory[index] || null);

  // 아이템 액션 처리
  const handleItemAction = (item: InventoryItem, action: 'use' | 'drop' | 'equip') => {
    if (isProcessing) return;
    
    const itemId = item.itemDefId;
    
    switch (action) {
      case 'use':
        onUseItem?.(itemId);
        break;
      case 'drop':
        onDropItem?.(itemId);
        break;
      case 'equip':
        onToggleEquipItem?.(itemId);
        break;
    }
    
    setSelectedItem(null);
  };

  // 아이템 카테고리에 따른 사용 가능한 액션들
  const getAvailableActions = (item: InventoryItem) => {
    const actions = [];
    
    // 장착/해제는 모든 아이템에 가능 (API가 토글 형태)
    actions.push({
      label: item.equipped ? '해제' : '장착',
      action: 'equip' as const,
      color: item.equipped ? 'text-orange-400' : 'text-green-400'
    });
    
    // 소모품(CONSUMABLE) 아이템 사용 - 백엔드 미구현으로 비활성화
    if (item.category === 'CONSUMABLE' || item.category?.includes('POTION')) {
      actions.push({
        label: '사용 (미구현)',
        action: 'use' as const,
        color: 'text-gray-500'
      });
    }
    
    // 모든 아이템 버리기 가능
    actions.push({
      label: '버리기',
      action: 'drop' as const,
      color: 'text-red-400'
    });
    
    return actions;
  };

  return (
    <aside className="flex w-full flex-col gap-6 sm:w-72">
      <div className="rounded-3xl border border-[#2f2f37] bg-[#1b1b21] p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[#32323a] bg-[#272730] text-center text-xs text-gray-400">
            캐릭터
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{playerInfo.name}</span>
            <span className="text-sm text-gray-400">레벨 {playerInfo.level}</span>
            <span className="text-xs text-gray-500">생명력 {playerInfo.life}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-xs">
          <Gauge label="HP" value={playerInfo.healthPoint} max={maxHP} color="bg-red-500" />
          <Gauge label="EXP" value={playerInfo.experiencePoint} max={maxEXP} color="bg-green-400" />
        </div>

        <div className="mt-6 grid grid-cols-4 gap-2 text-center text-xs text-gray-300">
          {stats.map((stat) => (
            <div key={stat.key} className="flex flex-col items-center gap-1">
              <Image 
                src={statIconMap[stat.key] ?? statIconMap.strength} 
                alt={stat.label} 
                width={32} 
                height={32} 
              />
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-[#2f2f37] bg-[#1b1b21] p-6 text-white">
        <h3 className="text-sm font-semibold text-gray-300">인벤토리</h3>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
          {inventorySlots.map((item, index) => {
            if (!item) {
              // 빈 슬롯
              return (
                <div key={`empty-${index}`} className="relative">
                  <div
                    className="relative flex aspect-square w-16 h-16 flex-col items-center justify-center rounded-xl border border-dashed border-[#35353f] bg-[#1a1a22]"
                  >
                    <div className="text-[#45454f] text-sm">+</div>
                  </div>
                  <span className="block text-[8px] text-[#55555f] text-center mt-0.5 leading-tight w-16 truncate max-w-16">빈 슬롯</span>
                </div>
              );
            }
            
            // 안전한 이미지 URL 생성 - picSrc 또는 itemPicSrc 사용
            const imageUrl = getSafeImageUrl(
              item.picSrc || item.itemPicSrc || '', 
              item.category || 'WEAPON'
            );
            
            const availableActions = getAvailableActions(item);
            const isSelected = selectedItem === item.itemDefId;
            
            return (
              <div key={item.itemDefId || index} className="relative">
                <ItemTooltip item={item}>
                  <div className="relative">
                    <div
                      onClick={() => setSelectedItem(isSelected ? null : item.itemDefId)}
                      className={`relative flex aspect-square w-16 h-16 flex-col items-center justify-center p-1 rounded-xl border cursor-pointer transition-all hover:scale-105 ${
                        item.equipped ? 'border-primary/70 bg-[#2a241d] shadow-lg shadow-primary/20' : 'border-[#35353f] bg-[#1f1f27] hover:border-[#45454f]'
                      } ${isSelected ? 'ring-1 ring-blue-500' : ''}`}
                    >
                      <div className="flex items-center justify-center flex-1">
                        <Image 
                          src={imageUrl}
                          alt={item.name || '아이템'} 
                          width={36} 
                          height={36} 
                          className="object-contain max-w-9 max-h-9" 
                          onError={(e) => handleImageError(item.name || '아이템', imageUrl, e)}
                        />
                      </div>
                      {item.equipped && (
                        <>
                          <span className="absolute -top-0.5 right-0.5 text-[7px] text-primary font-medium">장착</span>
                          <div className="absolute inset-0 rounded-xl bg-primary/10 pointer-events-none" />
                        </>
                      )}
                      {/* 등급 표시 */}
                      <div className={`absolute -bottom-0.5 left-0.5 h-1.5 w-1.5 rounded-full ${
                        item.grade?.toUpperCase() === 'LEGENDARY' ? 'bg-orange-500' :
                        item.grade?.toUpperCase() === 'EPIC' ? 'bg-purple-500' :
                        item.grade?.toUpperCase() === 'RARE' ? 'bg-blue-500' : 'bg-gray-500'
                      } shadow-sm`} />
                    </div>
                    <span className="block text-[8px] text-gray-200 truncate w-16 text-center mt-0.5 leading-tight max-w-16">
                      {item.name || '알 수 없는 아이템'}
                    </span>
                  </div>
                </ItemTooltip>
                
                {/* 액션 메뉴 */}
                {isSelected && availableActions.length > 0 && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50 bg-[#1a1a20] border border-[#35353f] rounded-lg shadow-lg min-w-[80px]">
                    {availableActions.map((actionItem, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => handleItemAction(item, actionItem.action)}
                        disabled={isProcessing}
                        className={`w-full px-2 py-1.5 text-[10px] font-medium ${actionItem.color} hover:bg-[#2a2a32] disabled:opacity-50 disabled:cursor-not-allowed transition-colors first:rounded-t-lg last:rounded-b-lg`}
                      >
                        {isProcessing ? '처리중...' : actionItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#27272f] px-4 py-3 text-sm text-gray-200">
          <span>보유금액</span>
          <span>{playerInfo.gold.toLocaleString()} GOLD</span>
        </div>

        <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/60 px-4 py-2 text-sm text-primary transition hover:bg-primary/10">
          <Image src="/assets/인벤토리.svg" alt="인벤토리" width={16} height={16} />
          인벤토리
        </button>
      </div>
    </aside>
  );
};

const Gauge = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
  const ratio = Math.max(0, Math.min(1, max === 0 ? 0 : value / max));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{label}</span>
        <span className="text-gray-300">
          {value} / {max}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-[#2d2d35]">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${ratio * 100}%` }} />
      </div>
    </div>
  );
};

export default PlayerSidebar;