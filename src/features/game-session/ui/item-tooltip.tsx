import Image from 'next/image';

import type { InventoryItem } from '@/features/game-session/model/types';
import { getSafeImageUrl, handleImageError } from '@/shared/utils/image-utils';

interface ItemTooltipProps {
  item: InventoryItem;
  children: React.ReactNode;
}

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

const ItemTooltip = ({ item, children }: ItemTooltipProps) => {
  const stats = [
    { key: 'strength', value: item.strength || 0, label: '힘' },
    { key: 'agility', value: item.agility || 0, label: '민첩' },
    { key: 'intelligence', value: item.intelligence || 0, label: '지능' },
    { key: 'luck', value: item.luck || 0, label: '행운' },
  ].filter(stat => stat.value > 0);

  // 안전한 이미지 URL 생성 - picSrc 또는 itemPicSrc 사용
  const imageUrl = getSafeImageUrl(item.picSrc || item.itemPicSrc || '', item.category || 'WEAPON');

  return (
    <div className="group relative inline-block">
      {children}
      
      {/* 툴팁 */}
      <div className="invisible absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 transform opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <div className={`w-64 rounded-2xl border ${getGradeColor(item.grade)} bg-[#1a1a20]/95 backdrop-blur-sm p-4 shadow-2xl`}>
          {/* 아이템 헤더 */}
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#35353f] bg-[#27272f]">
              <Image 
                src={imageUrl}
                alt={item.name || ''} 
                width={32} 
                height={32} 
                className="object-contain"
                onError={(e) => handleImageError(item.name || '', imageUrl || '', e)}
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">{item.name || '알 수 없음'}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.grade?.toUpperCase() === 'LEGENDARY' 
                    ? 'bg-orange-500/20 text-orange-300'
                    : item.grade?.toUpperCase() === 'EPIC'
                    ? 'bg-purple-500/20 text-purple-300'
                    : item.grade?.toUpperCase() === 'RARE'
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-gray-500/20 text-gray-300'
                }`}>
                  {getGradeName(item.grade)}
                </span>
                {item.category && <span className="text-xs text-gray-400">{item.category}</span>}
              </div>
            </div>
          </div>

          {/* 아이템 설명 */}
          {item.description && (
            <p className="mt-3 text-xs leading-relaxed text-gray-300">
              {item.description}
            </p>
          )}

          {/* 기본 능력치 */}
          {(item.baseStat || 0) > 0 && (
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
          {item.mainStat && (
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
          {item.itemEffects && item.itemEffects.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-gray-400">특수 효과</p>
              {item.itemEffects.map((effect, index) => (
                <div key={index} className="rounded-xl bg-[#2a2a32] p-2">
                  <div className="text-xs font-medium text-primary">{effect.itemEffectName}</div>
                  <div className="text-xs text-gray-300 mt-1 leading-relaxed">{effect.itemEffectDescription}</div>
                  <div className="text-xs text-gray-400 mt-1">등급: {effect.grade}</div>
                </div>
              ))}
            </div>
          )}

          {/* 가격 정보 */}
          {(item.price !== undefined && item.price !== null) && (
            <div className="mt-3 flex items-center justify-between border-t border-[#35353f] pt-2 text-xs">
              <span className="text-gray-400">판매가</span>
              <span className="text-yellow-400">{item.price.toLocaleString()} GOLD</span>
            </div>
          )}

          {/* 획득 정보 */}
          {item.acquiredAt && (
            <div className="mt-1 text-xs text-gray-500">
              {new Date(item.acquiredAt).toLocaleDateString('ko-KR')} 획득
              {item.source && ` • ${item.source}`}
            </div>
          )}
        </div>
        
        {/* 화살표 */}
        <div className="absolute bottom-full left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform border-l border-t border-[#35353f] bg-[#1a1a20]/95"></div>
      </div>
    </div>
  );
};

export default ItemTooltip;