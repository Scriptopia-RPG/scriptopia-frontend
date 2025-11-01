'use client';

import { useState } from 'react';
import Button from '@/shared/ui/button/button';

interface BackgroundStepProps {
  onNext: () => void;
}

export const BackgroundStep = ({ onNext }: BackgroundStepProps) => {
  const [background, setBackground] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-fg text-2xl font-bold">배경 입력하기</h2>
        <p className="text-sm text-gray-500">
          게임의 배경 스토리를 입력해 주세요. AI가 이를 기반으로 게임을 생성합니다.
        </p>
      </div>
      <textarea
        value={background}
        onChange={(e) => setBackground(e.target.value)}
        placeholder="예: 검은 숲에서 길을 잃은 모험가가 마법의 전설을 쫓아 모험을 떠나는 스토리..."
        className="focus:border-primary text-fg min-h-40 w-full rounded-lg border border-gray-200 p-4 text-sm placeholder-gray-400 focus:outline-none"
      />
      <div className="flex justify-end gap-3">
        <Button
          label="다음"
          onClick={onNext}
          disabled={!background.trim()}
          variant="primary"
          size="auto"
        />
      </div>
    </div>
  );
};
