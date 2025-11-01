'use client';

import Button from '@/shared/ui/button/button';

export const CompleteStep = () => {
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      <div className="bg-gradient-primary flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20">
        <span className="text-3xl sm:text-4xl">✓</span>
      </div>
      <h2 className="text-fg text-xl font-bold sm:text-2xl">게임 생성 완료!</h2>
      <p className="text-center text-xs text-gray-500 sm:text-sm">
        게임이 성공적으로 생성되었습니다.
        <br />
        이제 모험을 시작할 준비가 되었습니다!
      </p>
      <div className="pt-2">
        <Button
          label="게임 시작하기"
          variant="primary"
          size="auto"
        />
      </div>
    </div>
  );
};

