'use client';

import { useState } from 'react';
import Button from '@/shared/ui/button/button';

interface ItemsStepProps {
  onNext: () => void;
  onPrev: () => void;
}

export const ItemsStep = ({ onNext, onPrev }: ItemsStepProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const availableItems = [
    { id: '1', name: '마법의 검', description: '강력한 공격력을 가진 검' },
    { id: '2', name: '치유 포션', description: 'HP를 회복하는 포션' },
    { id: '3', name: '방어 방패', description: '적의 공격을 막는 방패' },
    { id: '4', name: '마법 지팡이', description: '마법 공격력을 높이는 지팡이' },
    { id: '5', name: '약초', description: '소량의 HP를 회복' },
    { id: '6', name: '투명 망토', description: '일시적으로 투명해짐' },
  ];

  const selectItem = (itemId: string) => {
    setSelectedItem(itemId);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-fg text-2xl font-bold">아이템 선택하기</h2>
        <p className="text-sm text-gray-500">아이템은 최대 1개 선택할 수 있습니다.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {availableItems.map((item) => (
          <button
            key={item.id}
            onClick={() => selectItem(item.id)}
            className={`flex flex-col rounded-lg border-2 p-4 text-left transition-all ${
              selectedItem === item.id
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="font-semibold">{item.name}</span>
            <span className="text-xs text-gray-500">{item.description}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-between gap-3">
        <Button label="이전" onClick={onPrev} variant="outline" size="auto" />
        <Button
          label="게임 생성"
          onClick={onNext}
          disabled={!selectedItem}
          variant="primary"
          size="auto"
        />
      </div>
    </div>
  );
};
