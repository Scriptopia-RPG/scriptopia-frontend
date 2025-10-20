'use client';

import { useState } from 'react';
import Button from '@/shared/ui/button/button';

interface AuctionFiltersProps {
  onFiltersChange: (filters: {
    itemName?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    grade?: string;
    effectGrades?: string[];
    mainStat?: string;
  }) => void;
}

export const AuctionFilters = ({ onFiltersChange }: AuctionFiltersProps) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [grade, setGrade] = useState('');
  const [selectedEffectGrades, setSelectedEffectGrades] = useState<string[]>([]);
  const [mainStat, setMainStat] = useState('');

  const handleSearch = () => {
    onFiltersChange({
      itemName: itemName || undefined,
      category: category || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      grade: grade || undefined,
      effectGrades: selectedEffectGrades.length > 0 ? selectedEffectGrades : undefined,
      mainStat: mainStat || undefined,
    });
  };

  const handleReset = () => {
    setItemName('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setGrade('');
    setSelectedEffectGrades([]);
    setMainStat('');
    onFiltersChange({});
  };

  const toggleEffectGrade = (effectGrade: string) => {
    setSelectedEffectGrades(prev => 
      prev.includes(effectGrade) 
        ? prev.filter(g => g !== effectGrade)
        : [...prev, effectGrade]
    );
  };

  const effectGrades = ['레전더리', '에픽', '레어'];

  return (
    <div className="w-80 bg-[#1f1f24] border border-[#2a2a32] rounded-2xl p-6 space-y-6">
      <h3 className="text-white text-lg font-medium">아이템 분류</h3>
      
      {/* 아이템 카테고리 */}
      <div>
        <label className="block text-gray-300 text-sm mb-2">무기</label>
        <select
          value={category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setCategory(e.target.value);
            // 카테고리 변경시 즉시 적용
            onFiltersChange({
              itemName: itemName || undefined,
              category: e.target.value || undefined,
              minPrice: minPrice ? Number(minPrice) : undefined,
              maxPrice: maxPrice ? Number(maxPrice) : undefined,
              grade: grade || undefined,
              effectGrades: selectedEffectGrades.length > 0 ? selectedEffectGrades : undefined,
              mainStat: mainStat || undefined,
            });
          }}
          className="w-full bg-[#2a2a32] border border-[#3a3a42] rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
        >
          <option value="">전체</option>
          <option value="WEAPON">무기</option>
          <option value="ARMOR">방어구</option>
          <option value="CONSUMABLE">유물</option>
        </select>
      </div>

      {/* 가격 범위 */}
      <div>
        <label className="block text-gray-300 text-sm mb-2">가격</label>
        <div className="flex space-x-2">
          <input
            placeholder="최소"
            value={minPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)}
            type="number"
            className="w-full bg-[#2a2a32] border border-[#3a3a42] rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
          />
          <input
            placeholder="최대"
            value={maxPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value)}
            type="number"
            className="w-full bg-[#2a2a32] border border-[#3a3a42] rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* 아이템 등급 */}
      <div>
        <label className="block text-gray-300 text-sm mb-2">아이템 등급</label>
        <select
          value={grade}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setGrade(e.target.value);
            // 등급 변경시 즉시 적용
            onFiltersChange({
              itemName: itemName || undefined,
              category: category || undefined,
              minPrice: minPrice ? Number(minPrice) : undefined,
              maxPrice: maxPrice ? Number(maxPrice) : undefined,
              grade: e.target.value || undefined,
              effectGrades: selectedEffectGrades.length > 0 ? selectedEffectGrades : undefined,
              mainStat: mainStat || undefined,
            });
          }}
          className="w-full bg-[#2a2a32] border border-[#3a3a42] rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
        >
          <option value="">전체</option>
          <option value="COMMON">일반</option>
          <option value="UNCOMMON">언커먼</option>
          <option value="RARE">레어</option>
          <option value="EPIC">에픽</option>
          <option value="LEGENDARY">전설</option>
        </select>
      </div>

      {/* 효과 등급 */}
      <div>
        <label className="block text-gray-300 text-sm mb-2">효과 등급</label>
        <div className="space-y-2">
          {effectGrades.map(effectGrade => (
            <div key={effectGrade} className="flex items-center">
              <button
                onClick={() => toggleEffectGrade(effectGrade)}
                className={`px-3 py-1 rounded text-sm mr-2 flex items-center ${
                  selectedEffectGrades.includes(effectGrade)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}
              >
                {effectGrade}
                {selectedEffectGrades.includes(effectGrade) && (
                  <span className="ml-1 text-xs">×</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 주 스탯 */}
      <div>
        <label className="block text-gray-300 text-sm mb-2">주 스탯</label>
        <select
          value={mainStat}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setMainStat(e.target.value);
            // 주 스탯 변경시 즉시 적용
            onFiltersChange({
              itemName: itemName || undefined,
              category: category || undefined,
              minPrice: minPrice ? Number(minPrice) : undefined,
              maxPrice: maxPrice ? Number(maxPrice) : undefined,
              grade: grade || undefined,
              effectGrades: selectedEffectGrades.length > 0 ? selectedEffectGrades : undefined,
              mainStat: e.target.value || undefined,
            });
          }}
          className="w-full bg-[#2a2a32] border border-[#3a3a42] rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
        >
          <option value="">전체</option>
          <option value="strength">힘</option>
          <option value="intelligence">지능</option>
          <option value="agility">민첩</option>
          <option value="luck">운</option>
        </select>
      </div>

      {/* 버튼들 */}
      <div className="flex space-x-2">
        <button
          onClick={handleReset}
          className="flex-1 bg-[#2a2a32] hover:bg-[#3a3a42] text-white px-4 py-2 rounded transition"
        >
          초기화
        </button>
        <Button
          onClick={handleSearch}
          className="flex-1"
        >
          검색
        </Button>
      </div>
    </div>
  );
};