'use client';

import Button from '@/shared/ui/button/button';

export const CompleteStep = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-gradient-primary flex h-20 w-20 items-center justify-center rounded-full">
        <span className="text-4xl">✓</span>
      </div>
      <h2 className="text-fg text-2xl font-bold">게임 생성 완료!</h2>
      <p className="text-center text-sm text-gray-500">
        게임이 성공적으로 생성되었습니다.
        <br />
        이제 모험을 시작할 준비가 되었습니다!
      </p>
      <Button
        label="게임 시작하기"
        variant="primary"
        size="auto"
      />
    </div>
  );
};

