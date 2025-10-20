import Image from 'next/image';

import { useAllUserItems } from '@/features/game-create/api/use-user-items.query';
import { getSafeImageUrl, handleImageError } from '@/shared/utils/image-utils';

interface SummaryStepProps {
  background: string;
  name: string;
  trait: string;
  selectedItemId: string | null;
}

const SummaryStep = ({ background, name, trait, selectedItemId }: SummaryStepProps) => {
  const { data: userItems = [] } = useAllUserItems();
  const selectedItem = selectedItemId ? userItems.find((item) => item.id === selectedItemId) : null;

  return (
    <div className="flex flex-col gap-10 text-white">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold sm:text-3xl">게임 생성</h1>
        <p className="text-sm text-gray-400 sm:text-base">입력한 정보를 다시 확인하고 게임을 시작해주세요.</p>
      </header>

      <div className="flex flex-col gap-6 rounded-2xl border border-[#2f2f37] bg-[#1b1b21] p-6">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-300 sm:text-base">배경</h2>
          <p className="whitespace-pre-wrap text-sm leading-6 text-gray-200 sm:text-base">{background}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-300 sm:text-base">캐릭터</h2>
          <p className="text-sm text-gray-200 sm:text-base">
            <span className="font-semibold text-white">{name}</span>
          </p>
          <p className="whitespace-pre-wrap text-sm leading-6 text-gray-200 sm:text-base">{trait}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-300 sm:text-base">선택한 아이템</h2>
          {selectedItem ? (
            <div className="flex items-center gap-4 rounded-xl border border-[#35353f] bg-[#23232a] p-4">
              <div className="relative">
                <Image 
                  src={getSafeImageUrl(selectedItem.picSrc, selectedItem.itemType)} 
                  alt={selectedItem.name} 
                  width={56} 
                  height={56} 
                  className="h-14 w-14 object-contain" 
                  onError={(e) => handleImageError(selectedItem.name, selectedItem.picSrc, e)}
                />
                {/* 등급 표시 */}
                <div className={`absolute -top-1 -left-1 h-3 w-3 rounded-full ${
                  selectedItem.grade === 'LEGENDARY' ? 'bg-orange-500' :
                  selectedItem.grade === 'EPIC' ? 'bg-purple-500' :
                  selectedItem.grade === 'RARE' ? 'bg-blue-500' : 'bg-gray-500'
                } shadow-sm`} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-white">{selectedItem.name}</span>
                <span className="text-sm text-gray-400">
                  {selectedItem.itemType === 'WEAPON' ? '무기' : 
                   selectedItem.itemType === 'ARMOR' ? '방어구' : '악세서리'}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">기본 능력치: {selectedItem.baseStat}</span>
                  {selectedItem.grade && (
                    <span className={`text-xs font-medium ${
                      selectedItem.grade === 'LEGENDARY' ? 'text-orange-400' :
                      selectedItem.grade === 'EPIC' ? 'text-purple-400' :
                      selectedItem.grade === 'RARE' ? 'text-blue-400' : 'text-gray-400'
                    }`}>
                      {selectedItem.grade}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">선택한 아이템이 없습니다.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default SummaryStep;