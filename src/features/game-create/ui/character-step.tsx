'use client';

import Button from '@/shared/ui/button/button';

interface CharacterStepProps {
  onNext: () => void;
  onPrev: () => void;
  characterName: string;
  characterDescription: string;
  onCharacterNameChange: (value: string) => void;
  onCharacterDescriptionChange: (value: string) => void;
}

export const CharacterStep = ({
  onNext,
  onPrev,
  characterName,
  characterDescription,
  onCharacterNameChange,
  onCharacterDescriptionChange,
}: CharacterStepProps) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-fg text-xl font-bold sm:text-2xl">캐릭터 생성하기</h2>
        <p className="text-xs text-gray-500 sm:text-sm">
          주인공 캐릭터의 이름과 특징을 입력해 주세요.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-fg block text-xs sm:text-sm">캐릭터 이름</label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => onCharacterNameChange(e.target.value)}
            placeholder="예: 아리엘"
            className="focus:border-primary text-fg mt-2 w-full rounded-lg border border-gray-200 p-3 text-sm placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-fg block text-xs sm:text-sm">캐릭터 특징</label>
          <textarea
            value={characterDescription}
            onChange={(e) => onCharacterDescriptionChange(e.target.value)}
            placeholder="캐릭터의 특징, 성격, 배경 등을 설명해 주세요..."
            className="focus:border-primary text-fg min-h-28 w-full rounded-lg border border-gray-200 p-3 text-sm placeholder-gray-400 focus:outline-none sm:min-h-32"
          />
        </div>
      </div>
      {/* Desktop Button */}
      <div className="hidden justify-between gap-3 pt-8 sm:flex">
        <Button label="이전" onClick={onPrev} variant="outline" size="auto" />
        <Button
          label="다음"
          onClick={onNext}
          disabled={!characterName.trim() || !characterDescription.trim()}
          variant="primary"
          size="auto"
        />
      </div>
      {/* Mobile Button - fixed at bottom */}
      <div className="bg-bg fixed right-0 bottom-0 left-0 z-40 flex gap-3 border-t border-gray-200 p-4 sm:hidden">
        <Button label="이전" onClick={onPrev} variant="outline" size="full" />
        <Button
          label="다음"
          onClick={onNext}
          disabled={!characterName.trim() || !characterDescription.trim()}
          variant="primary"
          size="full"
        />
      </div>
    </div>
  );
};
