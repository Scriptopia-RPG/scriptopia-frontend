'use client';

import { use } from 'react';

import { useGamePlay } from '@/entities/game/api/use-game-play.query';

import { ChoiceScene } from '@/features/game-play/ui/choice-scene';
import { BattleScene } from '@/features/game-play/ui/battle-scene';
import { DoneScene } from '@/features/game-play/ui/done-scene';

interface PageProps {
  params: Promise<{ uuid: string }>;
}

const Page = ({ params }: PageProps) => {
  const { uuid } = use(params);
  const { data: gameData, isLoading } = useGamePlay(uuid);

  const handleChoiceSelect = (choiceIndex: number) => {
    console.log('Choice selected:', choiceIndex);
    // TODO: API 호출로 선택 전송
  };

  const handleNext = () => {
    console.log('Next clicked');
    // TODO: 다음 씬으로 진행
  };

  const handleShare = () => {
    console.log('Share clicked');
    // TODO: 게임 공유
  };

  if (isLoading || !gameData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>게임을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <main className="bg-bg h-screen overflow-hidden">
      {gameData.sceneType === 'CHOICE' && (
        <ChoiceScene data={gameData} onChoiceSelect={handleChoiceSelect} />
      )}
      {gameData.sceneType === 'BATTLE' && <BattleScene data={gameData} />}
      {gameData.sceneType === 'DONE' && (
        <DoneScene data={gameData} onNext={handleNext} onShare={handleShare} />
      )}
    </main>
  );
};

export default Page;
