'use client';

import { useState } from 'react';
import Button from '@/shared/ui/button/button';

interface ItemsStepProps {
  onNext: () => void;
  onPrev: () => void;
  selectedItem: string | null;
  onSelectedItemChange: (value: string) => void;
}

type ItemCategory = 'weapon' | 'armor' | 'artifact';

interface Item {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
}

const AVAILABLE_ITEMS: Item[] = [
  { id: '1', name: '마법의 검', description: '강력한 공격력을 가진 검', category: 'weapon' },
  { id: '4', name: '마법 지팡이', description: '마법 공격력을 높이는 지팡이', category: 'weapon' },
  { id: '3', name: '방어 방패', description: '적의 공격을 막는 방패', category: 'armor' },
  { id: '6', name: '투명 망토', description: '일시적으로 투명해짐', category: 'armor' },
];

const CATEGORIES: { value: ItemCategory; label: string }[] = [
  { value: 'weapon', label: '무기' },
  { value: 'armor', label: '방어구' },
  { value: 'artifact', label: '유물' },
];

export const ItemsStep = ({
  onNext,
  onPrev,
  selectedItem,
  onSelectedItemChange,
}: ItemsStepProps) => {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('weapon');

  const filteredItems = AVAILABLE_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-fg text-xl font-bold sm:text-2xl">아이템 선택하기</h2>
        <p className="text-xs text-gray-500 sm:text-sm">
          아이템은 최대 1개 선택할 수 있습니다. (선택)
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`rounded-lg border-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === category.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'bg-bg border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectedItemChange(selectedItem === item.id ? '' : item.id)}
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
        <Button label="다음" onClick={onNext} variant="primary" size="auto" />
      </div>
      {/* Mobile Button - fixed at bottom */}
      <div className="bg-bg fixed right-0 bottom-0 left-0 z-40 flex gap-3 border-t border-gray-200 p-4 sm:hidden">
        <Button label="이전" onClick={onPrev} variant="outline" size="full" />
        <Button label="다음" onClick={onNext} variant="primary" size="full" />
      </div>
    </div>
  );
};
