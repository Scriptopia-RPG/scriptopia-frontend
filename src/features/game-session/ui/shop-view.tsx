import { motion } from 'framer-motion';
import { useState } from 'react';
import type { GameSessionData } from '@/features/game-session/model/types';

interface ShopViewProps {
  session: GameSessionData;
  onBuyItem: (shopItemId: string) => void;
  onSellItem: (inventoryItemId: string) => void;
  onLeaveShop: () => void;
  onFightShopkeeper: () => void;
  onTalkToShopkeeper: () => void;
  onCustomAction: (action: string) => void;
  isProcessing: boolean;
}

const ShopView = ({ 
  session, 
  onBuyItem, 
  onSellItem, 
  onLeaveShop, 
  onFightShopkeeper,
  onTalkToShopkeeper,
  onCustomAction,
  isProcessing 
}: ShopViewProps) => {
  const shopItems = session.shopTable || [];
  const sellableItems = session.inventory.filter(item => !item.equipped);
  const [userInput, setUserInput] = useState('');

  const getGradeColor = (grade?: string) => {
    if (!grade) return 'border-gray-500 bg-gray-500/10';
    
    switch (grade.toUpperCase()) {
      case 'LEGENDARY':
        return 'border-orange-500 bg-orange-500/10';
      case 'EPIC':
        return 'border-purple-500 bg-purple-500/10';
      case 'RARE':
        return 'border-blue-500 bg-blue-500/10';
      case 'COMMON':
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getGradeName = (grade?: string) => {
    if (!grade) return '일반';
    
    switch (grade.toUpperCase()) {
      case 'LEGENDARY':
        return '전설';
      case 'EPIC':
        return '영웅';
      case 'RARE':
        return '희귀';
      case 'COMMON':
      default:
        return '일반';
    }
  };

  // 아이템 툴팁 컴포넌트 (동적 위치 조정)
  const ItemTooltip = ({ item, children }: { item: any, children: React.ReactNode }) => {
    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
    const [showAbove, setShowAbove] = useState(false);
    
    const stats = [
      { key: 'strength', value: item?.strength || 0, label: '힘' },
      { key: 'agility', value: item?.agility || 0, label: '민첩' },
      { key: 'intelligence', value: item?.intelligence || 0, label: '지능' },
      { key: 'luck', value: item?.luck || 0, label: '행운' },
    ].filter(stat => stat.value > 0);

    const handleMouseEnter = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const tooltipWidth = 320; // w-80 = 320px
      const tooltipHeight = 350; // 예상 툴팁 높이
      
      // 화면 아래쪽 남은 공간 확인
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // 아래쪽 공간이 부족하면 위쪽에 표시
      const shouldShowAbove = spaceBelow < tooltipHeight + 20 && spaceAbove > tooltipHeight + 20;
      setShowAbove(shouldShowAbove);
      
      const tooltipLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
      const tooltipTop = shouldShowAbove 
        ? rect.top - tooltipHeight - 8  // 아이템 위쪽
        : rect.bottom + 8; // 아이템 아래쪽
      
      setTooltipStyle({
        left: Math.max(16, Math.min(tooltipLeft, window.innerWidth - tooltipWidth - 16)),
        top: Math.max(16, tooltipTop),
      });
    };

    return (
      <div className="group relative" onMouseEnter={handleMouseEnter}>
        {children}
        
        {/* 툴팁 */}
        <div 
          className="invisible fixed z-[9999] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 pointer-events-none"
          style={tooltipStyle}
        >
          <div className={`w-80 rounded-2xl border ${getGradeColor(item?.grade)} bg-[#1a1a20]/95 backdrop-blur-sm p-5 shadow-2xl`}>
            {/* 아이템 헤더 */}
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#35353f] bg-[#27272f]">
                <span className="text-2xl">⚔️</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">{item?.name || '알 수 없음'}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item?.grade?.toUpperCase() === 'LEGENDARY' 
                      ? 'bg-orange-500/20 text-orange-300'
                      : item?.grade?.toUpperCase() === 'EPIC'
                      ? 'bg-purple-500/20 text-purple-300'
                      : item?.grade?.toUpperCase() === 'RARE'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {getGradeName(item?.grade)}
                  </span>
                  {item?.category && <span className="text-xs text-gray-400">{item.category}</span>}
                </div>
              </div>
            </div>

            {/* 아이템 설명 */}
            {item?.description && (
              <p className="mt-3 text-xs leading-relaxed text-gray-300">
                {item.description}
              </p>
            )}

            {/* 기본 능력치 */}
            {(item?.baseStat || 0) > 0 && (
              <div className="mt-3 rounded-xl bg-[#2a2a32] p-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">기본 능력치</span>
                  <span className="font-medium text-white">{item.baseStat}</span>
                </div>
              </div>
            )}

            {/* 추가 스탯 */}
            {stats.length > 0 && (
              <div className="mt-3 space-y-1">
                <p className="text-xs text-gray-400">추가 스탯</p>
                <div className="space-y-1">
                  {stats.map(stat => (
                    <div key={stat.key} className="flex items-center justify-between text-xs">
                      <span className="text-gray-300">{stat.label}</span>
                      <span className="font-medium text-green-400">+{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 주 능력치 */}
            {item?.mainStat && (
              <div className="mt-3 text-xs">
                <span className="text-gray-400">주 능력치: </span>
                <span className="text-primary font-medium">
                  {item.mainStat === 'STRENGTH' ? '힘' : 
                   item.mainStat === 'AGILITY' ? '민첩' :
                   item.mainStat === 'INTELLIGENCE' ? '지능' : '행운'}
                </span>
              </div>
            )}

            {/* 아이템 효과 */}
            {item?.itemEffects && item.itemEffects.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-gray-400">특수 효과</p>
                {item.itemEffects.map((effect: any, index: number) => (
                  <div key={index} className="rounded-xl bg-[#2a2a32] p-2">
                    <div className="text-xs font-medium text-primary">{effect.itemEffectName}</div>
                    <div className="text-xs text-gray-300 mt-1 leading-relaxed">{effect.itemEffectDescription}</div>
                    <div className="text-xs text-gray-400 mt-1">등급: {effect.grade}</div>
                  </div>
                ))}
              </div>
            )}

            {/* 가격 정보 */}
            {(item?.price !== undefined && item?.price !== null) && (
              <div className="mt-3 flex items-center justify-between border-t border-[#35353f] pt-2 text-xs">
                <span className="text-gray-400">판매가</span>
                <span className="text-yellow-400">{item.price.toLocaleString()} GOLD</span>
              </div>
            )}
          </div>
          
          {/* 화살표 */}
          {showAbove ? (
            // 툴팁이 위쪽에 있을 때 - 아래쪽 화살표
            <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform border-r border-b border-[#35353f] bg-[#1a1a20]/95"></div>
          ) : (
            // 툴팁이 아래쪽에 있을 때 - 위쪽 화살표
            <div className="absolute bottom-full left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform border-l border-t border-[#35353f] bg-[#1a1a20]/95"></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* 상점 헤더 */}
      <div className="flex-shrink-0 border-b border-[#2a2a32] bg-gradient-to-r from-amber-900/20 to-yellow-900/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-600">
              <span className="text-2xl">🏪</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-200">마법 상점</h1>
              <p className="text-sm text-amber-300/80">어서오세요, 모험가님!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">보유 골드:</span>
            <span className="text-lg font-bold text-yellow-400">{session.playerInfo?.gold || 0}G</span>
          </div>
        </div>
      </div>

      {/* 상점 메인 콘텐츠 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 상점 아이템 (구매) */}
        <div className="flex-1 flex flex-col border-r border-[#2a2a32]">
          <div className="flex-shrink-0 bg-[#1a1a20] p-4">
            <h2 className="text-lg font-semibold text-green-400 flex items-center gap-2">
              <span>💰</span>
              상점 아이템 ({shopItems.length}개)
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {shopItems.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-gray-500">
                판매 중인 아이템이 없습니다.
              </div>
            ) : (
              shopItems.map((item: any) => {
                const canAfford = (session.playerInfo?.gold || 0) >= item.price;
                
                return (
                  <ItemTooltip key={item.shopItemId} item={item}>
                    <motion.div
                      className={`rounded-xl border p-4 transition-all cursor-pointer ${
                        canAfford 
                          ? 'border-green-500/30 bg-green-900/10 hover:border-green-500/50 hover:bg-green-900/20' 
                          : 'border-gray-600/30 bg-gray-900/10'
                      }`}
                      whileHover={canAfford ? { scale: 1.02 } : {}}
                      whileTap={canAfford ? { scale: 0.98 } : {}}
                    >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                            <span className="text-lg">⚔️</span>
                          </div>
                          <div>
                            <h3 className={`font-semibold ${canAfford ? 'text-white' : 'text-gray-400'}`}>
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-400">{item.grade} 등급</p>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-300 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        
                        {/* 스탯 정보 */}
                        <div className="flex gap-2 text-xs mb-3">
                          {item.strength > 0 && (
                            <span className="px-2 py-1 rounded bg-red-500/20 text-red-300">
                              힘 +{item.strength}
                            </span>
                          )}
                          {item.agility > 0 && (
                            <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300">
                              민첩 +{item.agility}
                            </span>
                          )}
                          {item.intelligence > 0 && (
                            <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                              지능 +{item.intelligence}
                            </span>
                          )}
                          {item.luck > 0 && (
                            <span className="px-2 py-1 rounded bg-green-500/20 text-green-300">
                              운 +{item.luck}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-400 mb-2">
                          {item.price}G
                        </div>
                        <button
                          onClick={() => onBuyItem(item.shopItemId)}
                          disabled={!canAfford || isProcessing}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                            canAfford && !isProcessing
                              ? 'bg-green-600 text-white hover:bg-green-500'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {!canAfford ? '골드 부족' : isProcessing ? '구매 중...' : '구매'}
                        </button>
                      </div>
                    </div>
                    </motion.div>
                  </ItemTooltip>
                );
              })
            )}
          </div>
        </div>

        {/* 인벤토리 아이템 (판매) */}
        <div className="flex-1 flex flex-col">
          <div className="flex-shrink-0 bg-[#1a1a20] p-4">
            <h2 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
              <span>📦</span>
              판매 가능한 아이템 ({sellableItems.length}개)
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {sellableItems.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-gray-500">
                판매할 수 있는 아이템이 없습니다.
              </div>
            ) : (
              sellableItems.map((item) => {
                const sellPrice = Math.floor((item.price || 0) * 0.5);
                
                return (
                  <ItemTooltip key={item.itemDefId} item={item}>
                    <motion.div
                      className="rounded-xl border border-orange-500/30 bg-orange-900/10 p-4 transition-all hover:border-orange-500/50 hover:bg-orange-900/20 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                            <span className="text-lg">🎒</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{item.name}</h3>
                            <p className="text-sm text-gray-400">{item.grade} 등급</p>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-300 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        
                        {/* 스탯 정보 */}
                        <div className="flex gap-2 text-xs">
                          {(item.strength || 0) > 0 && (
                            <span className="px-2 py-1 rounded bg-red-500/20 text-red-300">
                              힘 +{item.strength}
                            </span>
                          )}
                          {(item.agility || 0) > 0 && (
                            <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300">
                              민첩 +{item.agility}
                            </span>
                          )}
                          {(item.intelligence || 0) > 0 && (
                            <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                              지능 +{item.intelligence}
                            </span>
                          )}
                          {(item.luck || 0) > 0 && (
                            <span className="px-2 py-1 rounded bg-green-500/20 text-green-300">
                              운 +{item.luck}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-400 mb-2">
                          {sellPrice}G
                        </div>
                        <button
                          onClick={() => onSellItem(item.itemDefId)}
                          disabled={isProcessing}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                            !isProcessing
                              ? 'bg-orange-600 text-white hover:bg-orange-500'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {isProcessing ? '판매 중...' : '판매'}
                        </button>
                      </div>
                    </div>
                    </motion.div>
                  </ItemTooltip>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* 사용자 입력 섹션 */}
      <div className="flex-shrink-0 border-t border-[#2a2a32] bg-[#1a1a20] p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            직접 행동 입력
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && userInput.trim() && !isProcessing) {
                  onCustomAction(userInput.trim());
                  setUserInput('');
                }
              }}
              placeholder="예: '상점 주인에게 할인을 부탁한다', '아이템을 감정해달라고 한다' 등"
              className="flex-1 bg-[#2a2a32] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              disabled={isProcessing}
            />
            <button
              onClick={() => {
                if (userInput.trim() && !isProcessing) {
                  onCustomAction(userInput.trim());
                  setUserInput('');
                }
              }}
              disabled={!userInput.trim() || isProcessing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              실행
            </button>
          </div>
        </div>

        {/* 상점 액션 버튼들 */}
        <div className="flex gap-3 justify-center">
          <motion.button
            onClick={onLeaveShop}
            disabled={isProcessing}
            className="flex-1 max-w-xs bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl px-6 py-3 font-semibold text-white transition hover:from-blue-500 hover:to-blue-600 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🚪 상점을 나간다
          </motion.button>
          
          <motion.button
            onClick={onTalkToShopkeeper}
            disabled={isProcessing}
            className="flex-1 max-w-xs bg-gradient-to-r from-green-600 to-green-700 rounded-xl px-6 py-3 font-semibold text-white transition hover:from-green-500 hover:to-green-600 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            💬 상점 주인과 대화하기
          </motion.button>
          
          <motion.button
            onClick={onFightShopkeeper}
            disabled={isProcessing}
            className="flex-1 max-w-xs bg-gradient-to-r from-red-600 to-red-700 rounded-xl px-6 py-3 font-semibold text-white transition hover:from-red-500 hover:to-red-600 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ⚔️ 상점 주인과 싸운다
          </motion.button>
        </div>
      </div>

    </div>
  );
};

export default ShopView;