'use client';

import Button from '@/shared/ui/button/button';

interface CompleteStepProps {
  formData: {
    background: string;
    characterName: string;
    characterDescription: string;
    selectedItem: string | null;
  };
  onPrev: () => void;
  onComplete: () => void;
}

const ITEM_MAP: Record<string, { name: string; description: string }> = {
  '1': { name: '마법의 검', description: '강력한 공격력을 가진 검' },
  '2': { name: '치유 포션', description: 'HP를 회복하는 포션' },
  '3': { name: '방어 방패', description: '적의 공격을 막는 방패' },
  '4': { name: '마법 지팡이', description: '마법 공격력을 높이는 지팡이' },
  '5': { name: '약초', description: '소량의 HP를 회복' },
  '6': { name: '투명 망토', description: '일시적으로 투명해짐' },
};

export const CompleteStep = ({ formData, onPrev, onComplete }: CompleteStepProps) => {
  const selectedItemInfo = formData.selectedItem ? ITEM_MAP[formData.selectedItem] : null;

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-fg text-xl font-bold sm:text-2xl">게임 준비하기</h2>
        <p className="text-xs text-gray-500 sm:text-sm">입력하신 정보를 확인해 주세요.</p>
      </div>

      {/* 배경 정보 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-fg text-sm font-semibold sm:text-base">배경 스토리</h3>
        <div className="bg-bg rounded-lg border border-gray-200 p-3 text-sm sm:p-4">
          <p className="whitespace-pre-wrap">{formData.background}</p>
        </div>
      </div>

      {/* 캐릭터 정보 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-fg text-sm font-semibold sm:text-base">캐릭터 정보</h3>
        <div className="bg-bg rounded-lg border border-gray-200 p-3 text-sm sm:p-4">
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-xs text-gray-500 sm:text-sm">이름</span>
              <p className="mt-1 font-medium">{formData.characterName}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 sm:text-sm">특징</span>
              <p className="mt-1 whitespace-pre-wrap">{formData.characterDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 아이템 정보 */}
      {selectedItemInfo && (
        <div className="flex flex-col gap-2">
          <h3 className="text-fg text-sm font-semibold sm:text-base">시작 아이템</h3>
          <div className="border-primary bg-primary/10 rounded-lg border p-3 text-sm sm:p-4">
            <span className="font-semibold">{selectedItemInfo.name}</span>
            <p className="mt-1 text-xs text-gray-500">{selectedItemInfo.description}</p>
          </div>
        </div>
      )}

      {/* Desktop Button */}
      <div className="hidden justify-between gap-3 pt-8 sm:flex">
        <Button label="이전" onClick={onPrev} variant="outline" size="auto" />
        <Button label="게임 생성하기" onClick={onComplete} variant="primary" size="auto" />
      </div>
      {/* Mobile Button - fixed at bottom */}
      <div className="bg-bg fixed right-0 bottom-0 left-0 z-40 flex gap-3 border-t border-gray-200 p-4 sm:hidden">
        <Button label="이전" onClick={onPrev} variant="outline" size="full" />
        <Button label="게임 생성하기" onClick={onComplete} variant="primary" size="full" />
      </div>
    </div>
  );
};
