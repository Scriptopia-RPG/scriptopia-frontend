"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import StepIndicator from '@/features/game-create/ui/step-indicator';
import BackgroundStep from '@/features/game-create/ui/background-step';
import CharacterStep from '@/features/game-create/ui/character-step';
import ItemStep from '@/features/game-create/ui/item-step';
import SummaryStep from '@/features/game-create/ui/summary-step';
import Header from '@/widgets/header/ui/header';
import { useCreateGame } from '@/features/game-create/api/use-create-game.mutation';

type StepIndex = 0 | 1 | 2 | 3;

const initialForm = {
  background: '',
  name: '',
  trait: '',
  itemId: null as string | null,
};

const CreateGamePage = () => {
  const router = useRouter();
  const [step, setStep] = useState<StepIndex>(0);
  const [form, setForm] = useState(initialForm);
  const createMutation = useCreateGame();

  const isSubmitting = createMutation.isPending;

  const canProceed =
    step === 0
      ? form.background.trim().length > 0
      : step === 1
      ? form.name.trim().length > 0 && form.trait.trim().length > 0
      : step === 2
      ? true // 아이템 선택은 선택사항
      : true;

  const goNext = () => {
    if (!canProceed) {
      return;
    }

    if (step === 3) {
      // 아이템 선택은 선택사항
      createMutation.mutate(
        {
          background: form.background,
          characterName: form.name,
          characterDescription: form.trait,
          selectedItemId: form.itemId ?? undefined,
        },
        {
          onSuccess: (res) => {
            console.log('🎉 게임 생성 성공:', res);
            if (res.gameId) {
              router.push(`/play/${res.gameId}`);
            } else {
              console.error('게임 ID가 없습니다:', res);
              alert('게임 ID가 반환되지 않았습니다.');
            }
          },
          onError: (error: any) => {
            console.error('❌ 게임 생성 실패:', error);
            alert(error.message || '게임 생성에 실패했습니다.');
          },
        },
      );
      return;
    }

    setStep((prev) => (prev + 1) as StepIndex);
  };

  const goPrev = () => {
    if (step === 0 || isSubmitting) return;
    setStep((prev) => (prev - 1) as StepIndex);
  };

  const updateForm = (field: 'background' | 'name' | 'trait', value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemSelect = (itemId: string) => {
    setForm((prev) => ({ ...prev, itemId }));
  };

  return (
    <div className="min-h-screen bg-[#151518] text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-20 sm:px-8">
        <StepIndicator current={step} />

        <section className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6 sm:p-10">
          {step === 0 && <BackgroundStep background={form.background} onChange={updateForm} />}
          {step === 1 && <CharacterStep name={form.name} trait={form.trait} onChange={updateForm} />}
          {step === 2 && <ItemStep selectedItemId={form.itemId} onSelect={handleItemSelect} />}
          {step === 3 && (
            <SummaryStep
              background={form.background}
              name={form.name}
              trait={form.trait}
              selectedItemId={form.itemId}
            />
          )}
        </section>

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={goPrev}
            disabled={step === 0 || isSubmitting}
            className="inline-flex items-center justify-center rounded-xl border border-gray-600 px-6 py-2 text-sm text-gray-300 transition disabled:opacity-40"
          >
            이전
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canProceed || isSubmitting}
            className="bg-gradient-primary inline-flex items-center justify-center rounded-xl px-8 py-3 text-sm font-semibold text-white transition disabled:opacity-40"
          >
            {step === 3 ? (isSubmitting ? '시작 중…' : '시작하기') : '다음'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default CreateGamePage;