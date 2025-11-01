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
      <main className="mx-auto mt-32 w-full max-w-5xl px-5 py-8 sm:px-14">
        <h1 className="sr-only">게임 생성</h1>

        {/* Progress Steps */}
        <div className="mb-12 flex justify-center">
          <div className="relative flex w-full max-w-3xl items-center justify-between">
            {/* Progress Line Background */}
            <div className="absolute top-5 right-0 left-0 z-0 flex gap-8">
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
              <div key={idx} className="bg-bg relative z-10 flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    idx <= currentStepIndex
                      ? 'bg-gradient-primary text-white'
                      : 'border-2 border-gray-300 bg-transparent text-gray-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
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
        <div className="bg-surface-subtle rounded-2xl p-8 sm:p-12">
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
