'use client';

import { use } from 'react';

import { useGamePlay } from '@/entities/game/api/use-game-play.query';

import { useSelectChoice } from '@/features/game-play/api/use-select-choice.mutation';

import { ChoiceScene } from '@/features/game-play/ui/choice-scene';
import { BattleScene } from '@/features/game-play/ui/battle-scene';
import { DoneScene } from '@/features/game-play/ui/done-scene';

interface PageProps {
  params: Promise<{ uuid: string }>;
}

const Page = ({ params }: PageProps) => {
  const { uuid } = use(params);
  const { data: gameData, isLoading, refetch } = useGamePlay(uuid);
  const { mutate: selectChoice, isPending } = useSelectChoice(uuid);

  const handleChoiceSelect = (choiceIndex: number) => {
    selectChoice(
      { choiceIndex },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          const fetchError = error as { body?: string };
          if (fetchError?.body) {
            try {
              const errorBody = JSON.parse(fetchError.body);
              alert(errorBody.message || '선택에 실패했습니다.');
            } catch {
              alert('선택에 실패했습니다.');
            }
          } else {
            alert('선택에 실패했습니다.');
          }
        },
      },
    );
  };

  const handleTextSubmit = (text: string) => {
    selectChoice(
      { customAction: text },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          const fetchError = error as { body?: string };
          if (fetchError?.body) {
            try {
              const errorBody = JSON.parse(fetchError.body);
              alert(errorBody.message || '입력에 실패했습니다.');
            } catch {
              alert('입력에 실패했습니다.');
            }
          } else {
            alert('입력에 실패했습니다.');
          }
        },
      },
    );
  };

  const handleNext = () => {
    console.log('Next clicked');
    // TODO: 다음 씬으로 진행
  };

  if (isLoading || !gameData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>게임을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <main className="bg-bg h-screen overflow-hidden md:pt-16">
      {gameData.sceneType === 'CHOICE' && (
        <ChoiceScene
          data={gameData}
          onChoiceSelect={handleChoiceSelect}
          onTextSubmit={handleTextSubmit}
          isPending={isPending}
        />
      )}
      {gameData.sceneType === 'BATTLE' && <BattleScene data={gameData} />}
      {gameData.sceneType === 'DONE' && <DoneScene data={gameData} onNext={handleNext} />}
    </main>
  );
};

export default Page;
