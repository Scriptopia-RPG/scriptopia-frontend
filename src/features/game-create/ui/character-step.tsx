'use client';

import { useState } from 'react';

import Button from '@/shared/ui/button/button';

interface CharacterStepProps {
  onNext: () => void;
  onPrev: () => void;
}

export const CharacterStep = ({ onNext, onPrev }: CharacterStepProps) => {
  const [characterName, setCharacterName] = useState('');
  const [characterDescription, setCharacterDescription] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-fg text-2xl font-bold">캐릭터 생성하기</h2>
        <p className="text-sm text-gray-500">주인공 캐릭터의 이름과 특징을 입력해 주세요.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-fg block text-sm">캐릭터 이름</label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="예: 아리엘"
            className="focus:border-primary text-fg mt-2 w-full rounded-lg border border-gray-200 p-3 text-sm placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-fg block text-sm">캐릭터 특징</label>
          <textarea
            value={characterDescription}
            onChange={(e) => setCharacterDescription(e.target.value)}
            placeholder="캐릭터의 특징, 성격, 배경 등을 설명해 주세요..."
            className="focus:border-primary text-fg min-h-32 w-full rounded-lg border border-gray-200 p-3 text-sm placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex justify-between gap-3">
        <Button label="이전" onClick={onPrev} variant="outline" size="auto" />
        <Button
          label="다음"
          onClick={onNext}
          disabled={!characterName.trim() || !characterDescription.trim()}
          variant="primary"
          size="auto"
        />
      </div>
    </div>
  );
};
