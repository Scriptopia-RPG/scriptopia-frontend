'use client';

import Button from '@/shared/ui/button/button';

interface ItemsStepProps {
  onNext: () => void;
  onPrev: () => void;
  selectedItem: string | null;
  onSelectedItemChange: (value: string) => void;
}

const AVAILABLE_ITEMS = [
  { id: '1', name: '마법의 검', description: '강력한 공격력을 가진 검' },
  { id: '2', name: '치유 포션', description: 'HP를 회복하는 포션' },
  { id: '3', name: '방어 방패', description: '적의 공격을 막는 방패' },
  { id: '4', name: '마법 지팡이', description: '마법 공격력을 높이는 지팡이' },
  { id: '5', name: '약초', description: '소량의 HP를 회복' },
  { id: '6', name: '투명 망토', description: '일시적으로 투명해짐' },
];

export const ItemsStep = ({
  onNext,
  onPrev,
  selectedItem,
  onSelectedItemChange,
}: ItemsStepProps) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-fg text-xl font-bold sm:text-2xl">아이템 선택하기</h2>
        <p className="text-xs text-gray-500 sm:text-sm">아이템은 최대 1개 선택할 수 있습니다.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {AVAILABLE_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectedItemChange(item.id)}
            className={`flex flex-col rounded-lg border-2 p-3 text-left transition-all sm:p-4 ${
              selectedItem === item.id
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-gray-300 active:border-gray-400'
            }`}
          >
            <span className="text-sm font-semibold sm:text-base">{item.name}</span>
            <span className="text-xs text-gray-500">{item.description}</span>
          </button>
        ))}
      </div>
      {/* Desktop Button */}
      <div className="hidden justify-between gap-3 pt-8 sm:flex">
        <Button label="이전" onClick={onPrev} variant="outline" size="auto" />
        <Button
          label="게임 생성"
          onClick={onNext}
          disabled={!selectedItem}
          variant="primary"
          size="auto"
        />
      </div>
      {/* Mobile Button - fixed at bottom */}
      <div className="bg-bg fixed right-0 bottom-0 left-0 z-40 flex gap-3 border-t border-gray-200 p-4 sm:hidden">
        <Button label="이전" onClick={onPrev} variant="outline" size="full" />
        <Button
          label="게임 생성"
          onClick={onNext}
          disabled={!selectedItem}
          variant="primary"
          size="full"
        />
      </div>
    </div>
  );
};
