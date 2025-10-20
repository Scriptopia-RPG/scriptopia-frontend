import { useMutation, useQuery } from '@tanstack/react-query';
import useAuthStore from '@/entities/auth/model/auth.store';
import { ExistingGameResponse } from '../model/types';

// 게임 삭제 요청 타입
interface DeleteGameRequest {
  gameId: string;
}

// 게임 삭제 응답 타입
interface DeleteGameResponse {
  message: string;
}

// 게임 진입 응답 타입 (sceneType에 따라 다름)
interface GameEnterResponse {
  sceneType: 'CHOICE' | 'BATTLE' | 'DONE';
  startedAt: string;
  updatedAt: string;
  background: string;
  location: string;
  progress: number;
  stageSize: number;
  playerInfo: {
    name: string;
    life: number;
    level: number;
    healthPoint: number;
    experiencePoint: number;
    trait: string;
    strength: number;
    agility: number;
    intelligence: number;
    luck: number;
    gold: number;
  };
  npcInfo?: {
    name: string;
    rank: number;
    trait: string;
    strength: number;
    agility: number;
    intelligence: number;
    luck: number;
    npcWeaponName: string;
    npcWeaponDescription: string;
  };
  inventory: Array<{
    itemDefId: string;
    acquiredAt: string;
    equipped: boolean;
    source: string;
    name: string;
    description: string;
    itemPicSrc: string;
    category: string;
    baseStat: number;
    itemEffects: Array<{
      itemEffectName: string;
      itemEffectDescription: string;
      grade: string;
    }>;
    strength: number;
    agility: number;
    intelligence: number;
    luck: number;
    mainStat: string;
    grade: string;
    price: number;
  }>;
  // CHOICE 타입일 때
  choiceInfo?: Array<{
    detail: string;
    stats: string;
    probability: number;
  }>;
  // BATTLE 타입일 때
  curTurnId?: number;
  playerHp?: number[];
  enemyHp?: number[];
  battleStory?: Array<{
    turnInfo: string;
  }>;
  playerWin?: boolean;
  // DONE 타입일 때
  rewardInfo?: {
    gainedItemNames: string[];
    rewardStrength: number;
    rewardAgility: number;
    rewardIntelligence: number;
    rewardLuck: number;
    rewardLife: number;
    rewardGold: number;
  };
}

// 기존 게임 조회
const getExistingGame = async (): Promise<ExistingGameResponse> => {
  const token = useAuthStore.getState().accessToken;
  
  const response = await fetch('/api/games/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    const error = {
      status: response.status,
      statusText: response.statusText,
      response: { data: errorData },
      url: '/api/games/me'
    };
    
    throw error;
  }

  return response.json();
};

// 기존 게임 삭제
const deleteGame = async (request: DeleteGameRequest): Promise<DeleteGameResponse> => {
  const token = useAuthStore.getState().accessToken;
  
  const response = await fetch('/api/games', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    const error = {
      status: response.status,
      statusText: response.statusText,
      response: { data: errorData },
      url: '/api/games'
    };
    
    throw error;
  }

  return response.json();
};

// 게임 진입 (실제 API 호출)
const enterGame = async (gameId: string): Promise<GameEnterResponse> => {
  const token = useAuthStore.getState().accessToken;
  
  console.log('🎮 게임 진입 요청:', { gameId, token: token?.substring(0, 20) + '...' });
  
  const response = await fetch(`/api/games/${gameId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  console.log('📡 게임 진입 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    console.error('❌ 게임 진입 에러:', errorData);
    
    const error = {
      status: response.status,
      statusText: response.statusText,
      response: { data: errorData },
      url: `/api/games/${gameId}`
    };
    
    throw error;
  }

  const data = await response.json();
  console.log('✅ 게임 진입 성공 데이터:', data);
  
  return data;
};

// React Query hooks
export const useExistingGame = () => {
  return useQuery({
    queryKey: ['existing-game'],
    queryFn: getExistingGame,
    retry: false,
  });
};

export const useDeleteGame = () => {
  return useMutation({
    mutationFn: deleteGame,
    onSuccess: (response) => {
      console.log('🗑️ 게임 삭제 성공:', response);
    },
    onError: (error: any) => {
      console.error('❌ 게임 삭제 실패:', error);
      
      let errorMessage = '게임 삭제에 실패했습니다.';
      
      if (error.response?.data?.detailCode) {
        switch (error.response.data.detailCode) {
          case 'E404002':
            errorMessage = '사용자를 찾을 수 없습니다.';
            break;
          case 'E404006':
            errorMessage = '게임을 불러올 수 없습니다.';
            break;
          default:
            errorMessage = error.response.data.message || errorMessage;
        }
      }
      
      throw new Error(errorMessage);
    },
  });
};

export const useEnterGame = () => {
  return useMutation({
    mutationFn: enterGame,
    onSuccess: (response) => {
      console.log('🎮 게임 진입 성공:', response);
    },
    onError: (error: any) => {
      console.error('❌ 게임 진입 실패:', error);
      
      let errorMessage = '게임 진입에 실패했습니다.';
      
      if (error.response?.data?.detailCode) {
        switch (error.response.data.detailCode) {
          case 'E404001':
            errorMessage = '사용자를 찾을 수 없습니다.';
            break;
          default:
            errorMessage = error.response.data.message || errorMessage;
        }
      }
      
      throw new Error(errorMessage);
    },
  });
};