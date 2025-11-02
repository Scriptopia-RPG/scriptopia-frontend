'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useCreateGame } from '@/features/game-create/api/use-create-game.mutation';

import { BackgroundStep } from '@/features/game-create/ui/background-step';
import { CharacterStep } from '@/features/game-create/ui/character-step';
import { ItemsStep } from '@/features/game-create/ui/items-step';
import { CompleteStep } from '@/features/game-create/ui/complete-step';

type GameCreateStep = 'background' | 'character' | 'items' | 'complete';

const STEP_LABELS = ['배경 입력', '캐릭터 생성', '아이템 선택', '게임 생성'] as const;

type GameFormData = {
  background: string;
  characterName: string;
  characterDescription: string;
  selectedItem: string | null;
};

const Page = () => {
  const router = useRouter();
  const [step, setStep] = useState<GameCreateStep>('background');
  const [formData, setFormData] = useState<GameFormData>({
    background: '',
    characterName: '',
    characterDescription: '',
    selectedItem: null,
  });

  const { mutate: createGame, isPending } = useCreateGame();

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

  const handleComplete = () => {
    const payload: {
      background: string;
      characterName: string;
      characterDescription: string;
      itemDefId?: number;
    } = {
      background: formData.background,
      characterName: formData.characterName,
      characterDescription: formData.characterDescription,
    };

    if (formData.selectedItem) {
      payload.itemDefId = parseInt(formData.selectedItem, 10);
    }

    createGame(payload, {
      onSuccess: (response) => {
        router.push(`/games/play/${response.gameId}`);
      },
      onError: (error) => {
        const fetchError = error as { body?: string };
        if (fetchError?.body) {
          try {
            const errorBody = JSON.parse(fetchError.body);
            alert(errorBody.message || '게임 생성에 실패했습니다.');
          } catch {
            alert('게임 생성에 실패했습니다.');
          }
        } else {
          alert('게임 생성에 실패했습니다.');
        }
      },
    });
  };

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 sm:px-14 sm:py-12 sm:pb-8">
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
          {step === 'background' && (
            <BackgroundStep
              onNext={handleNext}
              value={formData.background}
              onChange={(value) => setFormData((prev) => ({ ...prev, background: value }))}
            />
          )}
          {step === 'character' && (
            <CharacterStep
              onNext={handleNext}
              onPrev={handlePrev}
              characterName={formData.characterName}
              characterDescription={formData.characterDescription}
              onCharacterNameChange={(value) =>
                setFormData((prev) => ({ ...prev, characterName: value }))
              }
              onCharacterDescriptionChange={(value) =>
                setFormData((prev) => ({ ...prev, characterDescription: value }))
              }
            />
          )}
          {step === 'items' && (
            <ItemsStep
              onNext={handleNext}
              onPrev={handlePrev}
              selectedItem={formData.selectedItem}
              onSelectedItemChange={(value) =>
                setFormData((prev) => ({ ...prev, selectedItem: value || null }))
              }
            />
          )}
          {step === 'complete' && (
            <CompleteStep
              formData={formData}
              onPrev={handlePrev}
              onComplete={handleComplete}
              isPending={isPending}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Page;
