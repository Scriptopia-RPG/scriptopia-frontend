'use client';

import { useState } from 'react';
import Button from '@/shared/ui/button/button';
import { useInventory } from '@/entities/inventory-item/api/use-inventory.query';
import type { InventoryItem } from '@/entities/inventory-item/model/types';

interface SellItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSell: (itemId: number, price: number) => void;
}

type ItemCategory = 'WEAPON' | 'ARMOR' | 'ACCESSORY';

export const SellItemModal = ({ isOpen, onClose, onSell }: SellItemModalProps) => {
  const { data: inventoryData, isLoading } = useInventory();
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('WEAPON');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [price, setPrice] = useState('');
  
  // MSW에서 { items: [...] } 형태로 반환하므로 배열 추출
  const inventory = (inventoryData as any)?.items || inventoryData || [];

  const handleSell = () => {
    if (selectedItem && price) {
      // userItemId를 사용 (MSW에서 필요한 값)
      const userItemId = selectedItem.userItemId || Date.now(); // fallback ID
      onSell(userItemId, Number(price));
      onClose();
      setSelectedItem(null);
      setPrice('');
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedItem(null);
    setPrice('');
  };

  // 카테고리별로 아이템 필터링
  const filteredInventory = inventory.filter(item => 
    item.itemType.toUpperCase() === selectedCategory
  ) || [];

  // 각 카테고리별 아이템 개수 계산
  const getItemCountByCategory = (category: ItemCategory) => {
    return inventory.filter(item => item.itemType.toUpperCase() === category).length || 0;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={handleClose} />
      
      {/* 새로운 모달 컨테이너 - 경매장 크기 수준 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#17171c] border border-[#2a2a32] rounded-3xl w-full max-w-6xl max-h-[85vh] overflow-hidden">
          
          {/* 헤더 */}
          <div className="flex justify-between items-center p-6 border-b border-[#2a2a32]">
            <h2 className="text-white text-2xl font-semibold">아이템 판매</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white text-3xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="flex h-[calc(85vh-88px)]">
            {/* 좌측: 카테고리 + 아이템 목록 */}
            <div className="flex-1 p-6 border-r border-[#2a2a32]">
              
              {/* 카테고리 탭 */}
              <div className="flex space-x-2 mb-6">
                {[
                  { key: 'WEAPON', label: '무기', color: 'text-orange-400', icon: '⚔️' },
                  { key: 'ARMOR', label: '방어구', color: 'text-purple-400', icon: '🛡️' },
                  { key: 'ACCESSORY', label: '액세서리', color: 'text-blue-400', icon: '💍' }
                ].map((category) => (
                  <button
                    key={category.key}
                    onClick={() => {
                      setSelectedCategory(category.key as ItemCategory);
                      setSelectedItem(null); // 카테고리 변경시 선택 해제
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedCategory === category.key
                        ? `bg-[#2a2a32] ${category.color} border border-[#3a3a42]`
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#1f1f24]'
                    }`}
                  >
                    <span>{category.icon}</span>
                    {category.label}
                    <span className="text-xs bg-[#3a3a42] px-2 py-1 rounded">
                      {getItemCountByCategory(category.key as ItemCategory)}
                    </span>
                  </button>
                ))}
              </div>

              {/* 아이템 그리드 */}
              <div className="h-[calc(100%-80px)] overflow-y-auto">
                {isLoading ? (
                  <div className="text-gray-400 text-center py-12">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    아이템을 불러오는 중...
                  </div>
                ) : filteredInventory.length > 0 ? (
                  <div className="grid grid-cols-4 gap-4">
                    {filteredInventory.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedItem(item)}
                        className={`relative bg-[#1f1f24] border-2 rounded-2xl p-3 cursor-pointer transition-all hover:scale-105 ${
                          selectedItem === item
                            ? 'border-blue-500 shadow-lg shadow-blue-500/30'
                            : `border-transparent hover:border-gray-500 ${getGradeBorderColor(item.grade)}`
                        }`}
                      >
                        {/* 등급 표시 코너 */}
                        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getGradeBackgroundColor(item.grade)}`}></div>
                        
                        {/* 아이템 이미지 */}
                        <div className="aspect-square bg-[#2a2a32] rounded-xl mb-3 overflow-hidden border border-[#3a3a42] relative">
                          {item.picSrc ? (
                            <img 
                              src={item.picSrc} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-3xl">{getItemIcon(item.itemType)}</span>
                            </div>
                          )}
                          
                          {/* 남은 사용 횟수 */}
                          <div className="absolute bottom-1 right-1 bg-black/70 text-xs text-white px-2 py-1 rounded">
                            {item.remainingUses}
                          </div>
                        </div>
                        
                        {/* 아이템 이름 */}
                        <div className={`font-semibold text-sm mb-1 truncate ${getGradeColor(item.grade || 'COMMON')}`}>
                          {item.name}
                        </div>
                        
                        {/* 주요 스탯 표시 */}
                        <div className="text-xs text-gray-400">
                          기본: {item.baseStat}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <div className="w-16 h-16 bg-[#2a2a32] rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl">📦</span>
                    </div>
                    <p>이 카테고리에 판매할 아이템이 없습니다</p>
                  </div>
                )}
              </div>
            </div>

            {/* 우측: 선택된 아이템 정보 & 판매 설정 */}
            <div className="w-80 p-6 bg-[#1a1a1f]">
              {selectedItem ? (
                <div className="h-full flex flex-col">
                  {/* 선택된 아이템 상세 정보 */}
                  <div className="mb-6">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-[#2a2a32] rounded-xl mx-auto mb-3 overflow-hidden border-2 border-[#3a3a42] relative">
                        {selectedItem.picSrc ? (
                          <img 
                            src={selectedItem.picSrc} 
                            alt={selectedItem.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-3xl">{getItemIcon(selectedItem.itemType)}</span>
                          </div>
                        )}
                      </div>
                      <div className={`font-semibold text-lg mb-1 ${getGradeColor(selectedItem.grade || 'COMMON')}`}>
                        {selectedItem.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {getItemTypeLabel(selectedItem.itemType)} • {getGradeLabel(selectedItem.grade)}
                      </div>
                    </div>
                    
                    {/* 설명 */}
                    <div className="text-xs text-gray-400 mb-4 p-3 bg-[#2a2a32] rounded-lg">
                      {selectedItem.description}
                    </div>
                    
                    {/* 스탯 정보 */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">기본 능력치:</span>
                        <span className="text-white font-medium">{selectedItem.baseStat}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="flex justify-between bg-red-900/20 p-1 rounded">
                          <span className="text-red-300">힘</span>
                          <span>{selectedItem.strength}</span>
                        </div>
                        <div className="flex justify-between bg-green-900/20 p-1 rounded">
                          <span className="text-green-300">민첩</span>
                          <span>{selectedItem.agility}</span>
                        </div>
                        <div className="flex justify-between bg-blue-900/20 p-1 rounded">
                          <span className="text-blue-300">지능</span>
                          <span>{selectedItem.intelligence}</span>
                        </div>
                        <div className="flex justify-between bg-yellow-900/20 p-1 rounded">
                          <span className="text-yellow-300">행운</span>
                          <span>{selectedItem.luck}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">사용 횟수:</span>
                        <span className="text-white">{selectedItem.remainingUses}</span>
                      </div>
                    </div>
                    
                    {/* 아이템 효과 */}
                    {selectedItem.itemEffect && selectedItem.itemEffect.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-purple-300 mb-2">특수 효과</div>
                        <div className="space-y-1 max-h-20 overflow-y-auto">
                          {selectedItem.itemEffect.map((effect, effectIdx) => (
                            <div key={effectIdx} className="text-xs text-purple-200 bg-purple-900/20 p-2 rounded">
                              <div className="font-medium">{effect.effectName}</div>
                              <div className="text-purple-300">{effect.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 가격 설정 */}
                  <div className="mt-auto">
                    <label className="block text-white text-lg font-medium mb-3">판매 가격</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                      placeholder="가격을 입력하세요"
                      className="w-full bg-[#2a2a32] border border-[#3a3a42] rounded-xl px-4 py-3 text-white text-lg focus:border-blue-500 focus:outline-none mb-4"
                    />
                    
                    {/* 가격 계산 */}
                    {price && Number(price) > 0 && (
                      <div className="space-y-2 text-sm mb-4 p-3 bg-[#2a2a32] rounded-lg">
                        <div className="flex justify-between">
                          <span className="text-gray-400">판매가격:</span>
                          <span className="text-white">{Number(price).toLocaleString()} 골드</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">수수료 (3%):</span>
                          <span className="text-red-300">-{Math.floor(Number(price) * 0.03).toLocaleString()}</span>
                        </div>
                        <div className="border-t border-[#3a3a42] pt-2 flex justify-between font-medium">
                          <span className="text-gray-300">실제 수령:</span>
                          <span className="text-green-400">{Math.floor(Number(price) * 0.97).toLocaleString()} 골드</span>
                        </div>
                      </div>
                    )}
                    
                    <Button
                      variant="primary"
                      onClick={handleSell}
                      disabled={!price || Number(price) <= 0}
                      className="w-full text-lg py-3"
                    >
                      경매장에 등록하기
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center">
                  <div className="text-gray-400">
                    <div className="w-16 h-16 bg-[#2a2a32] rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl">👈</span>
                    </div>
                    <h4 className="text-white text-lg font-medium mb-2">아이템을 선택해주세요</h4>
                    <p className="text-gray-400 text-sm">
                      왼쪽에서 판매할 아이템을<br />클릭하여 선택하세요
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function getGradeColor(grade: string | undefined | null): string {
  if (!grade) return 'text-gray-300';
  
  switch (grade.toLowerCase()) {
    case 'legendary':
    case '전설':
      return 'text-orange-400';
    case 'epic':
    case '에픽':
      return 'text-purple-400';
    case 'rare':
    case '레어':
      return 'text-blue-400';
    case 'uncommon':
    case '언커먼':
      return 'text-green-400';
    case 'common':
    case '일반':
      return 'text-gray-300';
    default:
      return 'text-gray-300';
  }
}

function getItemTypeLabel(itemType: string): string {
  switch (itemType.toLowerCase()) {
    case 'weapon':
      return '무기';
    case 'armor':
      return '방어구';
    case 'accessory':
      return '액세서리';
    default:
      return itemType;
  }
}

function getGradeLabel(grade: string): string {
  switch (grade.toLowerCase()) {
    case 'legendary':
      return '전설';
    case 'epic':
      return '에픽';
    case 'rare':
      return '레어';
    case 'uncommon':
      return '언커먼';
    case 'common':
      return '일반';
    default:
      return grade;
  }
}

function getItemIcon(itemType: string): string {
  switch (itemType.toLowerCase()) {
    case 'weapon':
      return '⚔️';
    case 'armor':
      return '🛡️';
    case 'accessory':
      return '💍';
    default:
      return '📦';
  }
}

function getGradeBorderColor(grade: string): string {
  switch (grade.toLowerCase()) {
    case 'legendary':
      return 'hover:border-orange-400';
    case 'epic':
      return 'hover:border-purple-400';
    case 'rare':
      return 'hover:border-blue-400';
    case 'uncommon':
      return 'hover:border-green-400';
    case 'common':
    default:
      return 'hover:border-gray-400';
  }
}

function getGradeBackgroundColor(grade: string): string {
  switch (grade.toLowerCase()) {
    case 'legendary':
      return 'bg-orange-400';
    case 'epic':
      return 'bg-purple-400';
    case 'rare':
      return 'bg-blue-400';
    case 'uncommon':
      return 'bg-green-400';
    case 'common':
    default:
      return 'bg-gray-400';
  }
}