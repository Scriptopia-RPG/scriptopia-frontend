'use client';

import Button from '@/shared/ui/button/button';
import type { AuctionListing } from '../../model/types';

interface AuctionTableProps {
  items: AuctionListing[];
  onPurchase?: (auctionId: number) => void;
  showPurchaseButton?: boolean;
}

export const AuctionTable = ({ items, onPurchase, showPurchaseButton = true }: AuctionTableProps) => {
  const gridCols = showPurchaseButton ? 'grid-cols-8' : 'grid-cols-7';
  
  return (
    <div className="bg-[#1f1f24] border border-[#2a2a32] rounded-2xl overflow-hidden">
      <div className={`grid ${gridCols} gap-4 p-4 bg-[#2a2a32] text-gray-300 text-sm font-medium`}>
        <div>아이템</div>
        <div>아이템 등급</div>
        <div>아이템 이름</div>
        <div>종류</div>
        <div>사용 횟수</div>
        <div>추 스탯</div>
        <div>가격</div>
        {showPurchaseButton && <div>구매</div>}
      </div>
      
      <div className="divide-y divide-[#2a2a32]">
        {items.map((item) => (
          <div key={item.auctionId} className={`grid ${gridCols} gap-4 p-4 items-center text-gray-200`}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#2a2a32] rounded border-2 border-[#3a3a42] flex items-center justify-center overflow-hidden">
                {item.item.picSrc ? (
                  <img 
                    src={item.item.picSrc} 
                    alt={item.item.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs">아이템</span>
                )}
              </div>
            </div>
            
            <div className={`text-sm font-medium ${getGradeColor(item.item.grade || 'COMMON')}`}>
              {item.item.grade || 'COMMON'}
            </div>
            
            <div className={`font-medium ${getGradeColor(item.item.grade || 'COMMON')}`}>
              {item.item.name}
            </div>
            
            <div className="text-sm text-gray-300">
              {item.item.category}
            </div>
            
            <div className="text-sm text-gray-300">
              {item.item.durability ? `${item.item.durability}/5` : '-'}
            </div>
            
            <div className="text-sm text-gray-300">
              {getMainStatDisplay(item.item)}
            </div>
            
            <div className="text-white font-medium">
              {item.price.toLocaleString()}
            </div>
            
            {showPurchaseButton && (
              <div>
                <Button
                  onClick={() => onPurchase?.(item.auctionId)}
                  className="px-3 py-1 text-sm"
                >
                  구매
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
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

function getMainStatDisplay(item: any): string {
  if (item.strength > 0) return '힘';
  if (item.agility > 0) return '민첩';
  if (item.intelligence > 0) return '지능';
  if (item.luck > 0) return '운';
  
  return '-';
}