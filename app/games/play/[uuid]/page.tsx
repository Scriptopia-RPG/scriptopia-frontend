'use client';

import { use, useState, useEffect, useRef } from 'react';

import { useGamePlay } from '@/entities/game/api/use-game-play.query';

import { useSelectChoice } from '@/features/game-play/api/use-select-choice.mutation';
import { useProgressGame } from '@/features/game-play/api/use-progress-game.mutation';

import { ChoiceScene } from '@/features/game-play/ui/choice-scene';
import { BattleScene } from '@/features/game-play/ui/battle-scene';
import { DoneScene } from '@/features/game-play/ui/done-scene';

interface PageProps {
  params: Promise<{ uuid: string }>;
}

interface Message {
  id: string;
  type: 'background' | 'choice' | 'custom';
  content: string;
  timestamp: Date;
}

const Page = ({ params }: PageProps) => {
  const { uuid } = use(params);
  const { data: gameData, isLoading, refetch } = useGamePlay(uuid);
  const { mutate: selectChoice, isPending } = useSelectChoice(uuid);
  const { mutate: progressGame, isPending: isProgressing } = useProgressGame(uuid);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 게임 데이터가 변경될 때마다 배경 메시지 추가
  useEffect(() => {
    if (gameData) {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === gameData.updatedAt);
        if (!exists) {
          return [
            ...prev,
            {
              id: gameData.updatedAt,
              type: 'background' as const,
              content: gameData.background,
              timestamp: new Date(gameData.updatedAt),
            },
          ];
        }
        return prev;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData?.updatedAt, gameData?.background]);

  // 스크롤을 가장 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChoiceSelect = (choiceIndex: number) => {
    if (!gameData) return;

    const selectedChoice =
      gameData.sceneType === 'CHOICE' ? gameData.choiceInfo[choiceIndex] : null;
    if (selectedChoice?.detail) {
      setMessages((prev) => [
        ...prev,
        {
          id: `choice-${Date.now()}`,
          type: 'choice' as const,
          content: selectedChoice.detail || '',
          timestamp: new Date(),
        },
      ]);
    }

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
    setMessages((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        type: 'custom' as const,
        content: text,
        timestamp: new Date(),
      },
    ]);

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
    progressGame(undefined, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        const fetchError = error as { body?: string };
        if (fetchError?.body) {
          try {
            const errorBody = JSON.parse(fetchError.body);
            alert(errorBody.message || '게임 진행에 실패했습니다.');
          } catch {
            alert('게임 진행에 실패했습니다.');
          }
        } else {
          alert('게임 진행에 실패했습니다.');
        }
      },
    });
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
          messages={messages}
          onChoiceSelect={handleChoiceSelect}
          onTextSubmit={handleTextSubmit}
          isPending={isPending}
          messagesEndRef={messagesEndRef}
        />
      )}
      {gameData.sceneType === 'BATTLE' && (
        <BattleScene data={gameData} onNext={handleNext} isPending={isProgressing} />
      )}
      {gameData.sceneType === 'DONE' && (
        <DoneScene data={gameData} onNext={handleNext} isPending={isProgressing} />
      )}
    </main>
  );
};

export default Page;
