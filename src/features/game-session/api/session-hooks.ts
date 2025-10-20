import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createGameSession,
  getGameSession,
  sendChoice,
  sendPrompt,
  progressGame,
  createGameHistory,
  buyShopItem,
  sellInventoryItem,
  useInventoryItem,
  dropInventoryItem,
  toggleEquipItem,
} from '@/features/game-session/api/session-api';
import type { PromptRequest } from '@/features/game-session/model/types';

const sessionKey = (sessionId: string) => ['game-session', sessionId];

export const useGameSession = (sessionId: string, enabled = true) => {
  const query = useQuery({
    queryKey: sessionKey(sessionId),
    queryFn: () => getGameSession(sessionId),
    enabled,
    staleTime: 0, // 언제나 신선한 데이터를 가져옴
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리페치 비활성화
    refetchOnMount: true, // 컴포넌트 마운트 시 리페치 활성화
  });

  // 데이터 로깅 (개발 환경에서만)
  if (query.data && process.env.NODE_ENV === 'development') {
    console.log('🎯 useGameSession - 최종 전달 데이터:', query.data);
    console.log('📋 게임 상태 요약:');
    console.log('  - sceneType:', query.data.sceneType);
    console.log('  - location:', query.data.location);
    console.log('  - progress:', `${query.data.progress}/${query.data.stageSize}`);
    console.log('  - player:', query.data.playerInfo.name, `(HP: ${query.data.playerInfo.healthPoint})`);
    if (query.data.choiceInfo) {
      console.log('  - choices:', query.data.choiceInfo.length, '개');
    }
    if (query.data.inventory) {
      console.log('  - inventory:', query.data.inventory.length, '개 아이템');
    }
  }

  // 에러 로깅 (개발 환경에서만)
  if (query.error && process.env.NODE_ENV === 'development') {
    console.error('❌ useGameSession 에러:', query.error);
  }

  return query;
};

export const useCreateGameSession = () => {
  return useMutation({
    mutationFn: createGameSession,
  });
};

export const useSendChoice = (sessionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (choiceIndex: number) => {
      if (!sessionId) throw new Error('세션 정보가 없습니다.');
      return sendChoice(sessionId, choiceIndex);
    },
    onSuccess: (data) => {
      // 선택지 선택 후 캐시 업데이트
      queryClient.setQueryData(sessionKey(sessionId), data);
      
      // 자동 progress 호출 제거 - 사용자가 명시적으로 버튼을 눌러야 진행
      console.log('✅ 선택지 선택 성공:', data);
      
      // 데이터가 제대로 로드되었는지 확인하기 위해 캐시를 무효화
      queryClient.invalidateQueries({ queryKey: sessionKey(sessionId) });
    },
  });
};

export const useSendPrompt = (sessionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PromptRequest) => {
      if (!sessionId) throw new Error('세션 정보가 없습니다.');
      return sendPrompt(sessionId, body);
    },
    onSuccess: (data) => {
      console.log('✅ 프롬프트 전송 성공:', data);
      
      // 새로운 데이터로 캐시 업데이트
      queryClient.setQueryData(sessionKey(sessionId), data);
      
      // 데이터 일관성을 위해 캐시 무효화
      queryClient.invalidateQueries({ queryKey: sessionKey(sessionId) });
    },
    onError: (error) => {
      console.error('❌ 프롬프트 전송 실패:', error);
    },
  });
};

export const useProgressGame = (sessionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      if (!sessionId) throw new Error('세션 정보가 없습니다.');
      return progressGame(sessionId);
    },
    onSuccess: (data) => {
      console.log('✅ 게임 진행 성공:', data);
      
      // 새로운 데이터로 캐시 업데이트
      queryClient.setQueryData(sessionKey(sessionId), data);
      
      // 데이터 일관성을 위해 캐시 무효화
      queryClient.invalidateQueries({ queryKey: sessionKey(sessionId) });
    },
    onError: (error) => {
      console.error('❌ 게임 진행 실패:', error);
    },
  });
};

export const useBuyShopItem = (sessionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (shopItemId: string) => {
      if (!sessionId) throw new Error('세션 정보가 없습니다.');
      return buyShopItem(sessionId, shopItemId);
    },
    onSuccess: (data) => {
      console.log('✅ 아이템 구매 성공:', data);
      
      // 새로운 데이터로 캐시 업데이트
      queryClient.setQueryData(sessionKey(sessionId), data);
      
      // 데이터 일관성을 위해 캐시 무효화
      queryClient.invalidateQueries({ queryKey: sessionKey(sessionId) });
    },
    onError: (error) => {
      console.error('❌ 아이템 구매 실패:', error);
    },
  });
};

export const useSellInventoryItem = (sessionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inventoryItemId: string) => {
      if (!sessionId) throw new Error('세션 정보가 없습니다.');
      return sellInventoryItem(sessionId, inventoryItemId);
    },
    onSuccess: (data) => {
      console.log('✅ 아이템 판매 성공:', data);
      
      // 새로운 데이터로 캐시 업데이트
      queryClient.setQueryData(sessionKey(sessionId), data);
      
      // 데이터 일관성을 위해 캐시 무효화
      queryClient.invalidateQueries({ queryKey: sessionKey(sessionId) });
    },
    onError: (error) => {
      console.error('❌ 아이템 판매 실패:', error);
    },
  });
};

export const useCreateGameHistory = () => {
  return useMutation({
    mutationFn: (gameId: string) => {
      if (!gameId) throw new Error('게임 ID가 없습니다.');
      return createGameHistory(gameId);
    },
    onSuccess: (data) => {
      console.log('✅ 게임 히스토리 생성 성공:', data);
      // 성공적으로 히스토리가 생성되면 상위 컴포넌트에서 처리
    },
    onError: (error) => {
      console.error('❌ 게임 히스토리 생성 실패:', error);
    },
  });
};

export const useUseItem = (sessionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => {
      if (!sessionId) throw new Error('세션 정보가 없습니다.');
      return useInventoryItem(sessionId, itemId);
    },
    onSuccess: (data) => {
      console.log('✅ 아이템 사용 성공:', data);
      
      // 새로운 데이터로 캐시 업데이트
      queryClient.setQueryData(sessionKey(sessionId), data);
      
      // 데이터 일관성을 위해 캐시 무효화
      queryClient.invalidateQueries({ queryKey: sessionKey(sessionId) });
    },
    onError: (error) => {
      console.error('❌ 아이템 사용 실패:', error);
    },
  });
};

export const useDropItem = (sessionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => {
      if (!sessionId) throw new Error('세션 정보가 없습니다.');
      return dropInventoryItem(sessionId, itemId);
    },
    onSuccess: (data) => {
      console.log('✅ 아이템 버리기 성공:', data);
      
      // 아이템 버리기는 게임 세션 데이터를 새로 불러와야 함
      queryClient.invalidateQueries({ queryKey: sessionKey(sessionId) });
    },
    onError: (error) => {
      console.error('❌ 아이템 버리기 실패:', error);
    },
  });
};

export const useToggleEquipItem = (sessionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => {
      if (!sessionId) throw new Error('세션 정보가 없습니다.');
      return toggleEquipItem(sessionId, itemId);
    },
    onSuccess: (data) => {
      console.log('✅ 아이템 장착/해제 성공:', data);
      
      // 새로운 데이터로 캐시 업데이트 (전체 게임 세션 데이터 반환)
      queryClient.setQueryData(sessionKey(sessionId), data);
      
      // 데이터 일관성을 위해 캐시 무효화
      queryClient.invalidateQueries({ queryKey: sessionKey(sessionId) });
    },
    onError: (error) => {
      console.error('❌ 아이템 장착/해제 실패:', error);
    },
  });
};

