'use client';

import { useState } from 'react';

import { BackgroundStep } from '@/features/game-create/ui/background-step';
import { CharacterStep } from '@/features/game-create/ui/character-step';
import { ItemsStep } from '@/features/game-create/ui/items-step';
import { CompleteStep } from '@/features/game-create/ui/complete-step';

type GameCreateStep = 'background' | 'character' | 'items' | 'complete';

const STEP_LABELS = ['배경 입력', '캐릭터 생성', '아이템 선택', '게임 생성'] as const;

const Page = () => {
  const [step, setStep] = useState<GameCreateStep>('background');

  const currentStepIndex = ['background', 'character', 'items', 'complete'].indexOf(step);

  const handleNext = () => {
    const steps: GameCreateStep[] = ['background', 'character', 'items', 'complete'];
    const nextIndex = steps.indexOf(step) + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex]);
    }
  };

  const handlePrev = () => {
    const steps: GameCreateStep[] = ['background', 'character', 'items', 'complete'];
    const prevIndex = steps.indexOf(step) - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex]);
    }
  };

  return (
    <>
      <main className="mx-auto mt-20 w-full max-w-5xl px-4 pt-6 pb-24 sm:mt-32 sm:px-14 sm:py-8 sm:pb-8">
        <h1 className="sr-only">게임 생성</h1>

        {/* Progress Steps */}
        <div className="mb-8 flex justify-center sm:mb-12">
          <div className="relative flex w-full max-w-3xl items-center justify-between">
            {/* Progress Line Background */}
            <div className="absolute top-4 right-0 left-0 z-0 flex gap-2 sm:top-5 sm:gap-8">
              {STEP_LABELS.slice(0, -1).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-0.5 flex-1 ${
                    idx < currentStepIndex ? 'bg-gradient-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Step Circles */}
            {STEP_LABELS.map((label, idx) => (
              <div
                key={idx}
                className="bg-bg relative z-10 flex flex-1 flex-col items-center sm:flex-none"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors sm:h-10 sm:w-10 sm:text-sm ${
                    idx <= currentStepIndex
                      ? 'bg-gradient-primary text-white'
                      : 'border-2 border-gray-300 bg-transparent text-gray-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`mt-1.5 text-[10px] leading-tight font-medium sm:mt-2 sm:text-xs ${
                    idx <= currentStepIndex ? 'text-fg' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-surface-subtle rounded-2xl p-4 sm:p-8 md:p-12">
          {step === 'background' && <BackgroundStep onNext={handleNext} />}
          {step === 'character' && <CharacterStep onNext={handleNext} onPrev={handlePrev} />}
          {step === 'items' && <ItemsStep onNext={handleNext} onPrev={handlePrev} />}
          {step === 'complete' && <CompleteStep />}
        </div>
      </main>
    </>
  );
};

export default Page;
