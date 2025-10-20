"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import GameSessionView from '@/features/game-session/ui/game-session-view';
import Header from '@/widgets/header/ui/header';
import {
  useGameSession,
  useSendChoice,
  useSendPrompt,
  useProgressGame,
  useCreateGameHistory,
  useBuyShopItem,
  useSellInventoryItem,
  useUseItem,
  useDropItem,
  useToggleEquipItem,
} from '@/features/game-session/api/session-hooks';

const GameSessionPage = () => {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();
  const sessionId = params?.sessionId;

  const { data, isLoading, isError } = useGameSession(sessionId ?? '', Boolean(sessionId));
  const choiceMutation = useSendChoice(sessionId ?? '');
  const promptMutation = useSendPrompt(sessionId ?? '');
  const progressMutation = useProgressGame(sessionId ?? '');
  const historyMutation = useCreateGameHistory();
  const buyItemMutation = useBuyShopItem(sessionId ?? '');
  const sellItemMutation = useSellInventoryItem(sessionId ?? '');
  const useItemMutation = useUseItem(sessionId ?? '');
  const dropItemMutation = useDropItem(sessionId ?? '');
  const toggleEquipItemMutation = useToggleEquipItem(sessionId ?? '');
  
  // 자동 progress 호출 제거 - 사용자가 명시적으로 버튼을 눌러야 진행
  // 이렇게 하면 캐시 경합 상태를 방지할 수 있음

  useEffect(() => {
    if (isError) {
      router.replace('/play');
    }
  }, [isError, router]);

  // 자동 이동 제거 - 사용자가 명시적으로 버튼을 클릭할 때만 이동하도록 함
  // useEffect(() => {
  //   if (historyMutation.isSuccess) {
  //     console.log('✅ 히스토리 생성 완료 - 게임 목록으로 이동');
  //     setTimeout(() => {
  //       router.push('/play');
  //     }, 2000); // 2초 후 자동 이동
  //   }
  // }, [historyMutation.isSuccess, router]);

  const handleChoice = (choiceId: string) => {
    choiceMutation.mutate(parseInt(choiceId));
  };

  const handlePrompt = (prompt: string) => {
    promptMutation.mutate({ prompt });
  };

  const handleShopBuy = (shopItemId: string) => {
    buyItemMutation.mutate(shopItemId);
  };

  const handleShopSell = (inventoryItemId: string) => {
    sellItemMutation.mutate(inventoryItemId);
  };

  return (
    <div className="min-h-screen bg-[#151518] text-white">
      <Header />
      {isLoading || !data ? (
        <div className="flex h-[60vh] items-center justify-center text-gray-400">세션 정보를 불러오는 중...</div>
      ) : (
        <GameSessionView
          session={data as any}
          gameId={sessionId ?? ''}
          choiceMutation={{ mutate: handleChoice, isPending: choiceMutation.isPending }}
          promptMutation={{ mutate: handlePrompt, isPending: promptMutation.isPending }}
          historyMutation={{ mutate: historyMutation.mutate, isPending: historyMutation.isPending, isSuccess: historyMutation.isSuccess, data: historyMutation.data }}
          buyItemMutation={{ mutate: handleShopBuy, isPending: buyItemMutation.isPending }}
          sellItemMutation={{ mutate: handleShopSell, isPending: sellItemMutation.isPending }}
          useItemMutation={{ mutate: useItemMutation.mutate, isPending: useItemMutation.isPending }}
          dropItemMutation={{ mutate: dropItemMutation.mutate, isPending: dropItemMutation.isPending }}
          toggleEquipItemMutation={{ mutate: toggleEquipItemMutation.mutate, isPending: toggleEquipItemMutation.isPending }}
          onGameOver={() => router.push('/explore')}
        />
      )}
    </div>
  );
};

export default GameSessionPage;