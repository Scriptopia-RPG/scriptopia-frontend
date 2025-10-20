import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/entities/auth/model/auth.store';

// 게임 생성 요청 타입 (백엔드 StartGameRequest 기준)
interface CreateGameRequest {
  background: string;
  characterName: string;
  characterDescription: string;
  itemId: string | null; // 백엔드에서 UUID 문자열 또는 null
}

// 게임 생성 응답 타입
interface CreateGameResponse {
  success: boolean;
  gameId: string;
  message: string;
}

// 프론트엔드에서 사용하는 게임 생성 데이터 타입
export interface GameCreateData {
  background: string;
  characterName: string;
  characterDescription: string;
  selectedItemId?: string; // 사용자 아이템 UUID
}

// 기존 정적 아이템 ID 매핑 (폴백용)
const STATIC_ITEM_ID_MAP: Record<string, string> = {
  'steel-axe': 'static-1',
  'steel-sword': 'static-2', 
  'ethereal-staff': 'static-3',
  'flame-trace': 'static-4',
  'steel-armor': 'static-5',
};

const createGame = async (gameData: GameCreateData): Promise<CreateGameResponse> => {
  // 선택된 아이템 ID가 없으면 null로 전달 (백엔드에서 처리)
  const itemId = gameData.selectedItemId || null;

  const requestData: CreateGameRequest = {
    background: gameData.background,
    characterName: gameData.characterName,
    characterDescription: gameData.characterDescription,
    itemId: itemId
  };

  console.log('🎮 게임 생성 요청 데이터:', requestData);
  console.log('🔍 선택된 아이템 ID:', gameData.selectedItemId);

  // 게임 생성은 실제 API 사용 (Next.js 프록시 경로)
  const response = await fetch('/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${useAuthStore.getState().accessToken}`,
    },
    body: JSON.stringify(requestData),
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

export const useCreateGame = () => {
  return useMutation({
    mutationFn: createGame,
    onError: (error: any) => {
      console.error('❌ 게임 생성 실패:', error);
      
      let errorMessage = '게임 생성에 실패했습니다.';
      
      if (error.response?.data?.code) {
        switch (error.response.data.code) {
          case 'E400014':
            errorMessage = '해당 아이템을 가지고 있지 않습니다.';
            break;
          case 'E400021':
            errorMessage = '진행 중인 게임이 이미 존재합니다.';
            break;
          case 'E400025':
            errorMessage = '아이템 사용 가능 횟수가 남아있지 않습니다.';
            break;
          case 'E404006':
            errorMessage = '게임을 불러올 수 없습니다.';
            break;
          case 'E500002':
            errorMessage = '외부 게임 API 호출에 실패했습니다.';
            break;
          case 'INVALID_ITEM_ID':
            errorMessage = '유효하지 않은 아이템입니다.';
            break;
          default:
            errorMessage = error.response.data.message || errorMessage;
        }
      }
      
      console.error('❌ 게임 생성 실패 상세:', {
        status: error.status,
        response: error.response?.data,
        url: error.url
      });
      throw new Error(errorMessage);
    },
  });
};