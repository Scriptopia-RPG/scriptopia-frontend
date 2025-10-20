'use client';

import Button from '@/shared/ui/button/button';
import type { MyAuction } from '../../model/types';

interface MyAuctionsTableProps {
  items: MyAuction[];
  onCancel?: (auctionId: number) => void;
}

export const MyAuctionsTable = ({ items, onCancel }: MyAuctionsTableProps) => {
  return (
    <div className="bg-[#1f1f24] border border-[#2a2a32] rounded-2xl overflow-hidden">
      <div className="grid grid-cols-6 gap-4 p-4 bg-[#2a2a32] text-gray-300 text-sm font-medium">
        <div>아이템</div>
        <div>아이템 이름</div>
        <div>가격</div>
        <div>상태</div>
        <div>등록 날짜</div>
        <div>처리</div>
      </div>
      
      <div className="divide-y divide-[#2a2a32]">
        {items.map((item) => (
          <div key={item.auctionId} className="grid grid-cols-6 gap-4 p-4 items-center text-gray-200">
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
            
            <div className={`font-medium ${getGradeColor(item.item.grade || 'COMMON')}`}>
              {item.item.name}
            </div>
            
            <div className="text-white font-medium">
              {item.price.toLocaleString()}
            </div>

            <div className={`text-sm font-medium ${getStatusColor(item.status)}`}>
              {getStatusText(item.status)}
            </div>
            
            <div className="text-sm text-gray-300">
              {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
            </div>
            
            <div>
              {item.status === 'ON_SALE' && (
                <button
                  onClick={() => onCancel?.(item.auctionId)}
                  className="px-3 py-1 text-sm text-red-400 border border-red-400 hover:bg-red-400 hover:text-white rounded transition"
                >
                  취소
                </button>
              )}
              {item.status === 'SOLD' && (
                <span className="text-green-400 text-sm">판매 완료</span>
              )}
              {item.status === 'CANCELLED' && (
                <span className="text-red-400 text-sm">취소됨</span>
              )}
            </div>
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

function getStatusColor(status: string): string {
  switch (status) {
    case 'ON_SALE':
      return 'text-blue-400';
    case 'SOLD':
      return 'text-green-400';
    case 'CANCELLED':
      return 'text-red-400';
    default:
      return 'text-gray-300';
  }
}

function getStatusText(status: string): string {
  switch (status) {
    case 'ON_SALE':
      return '판매중';
    case 'SOLD':
      return '판매 완료';
    case 'CANCELLED':
      return '취소됨';
    default:
      return status;
  }
}