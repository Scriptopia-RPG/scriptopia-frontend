import customFetch from '@/shared/api/custom-fetch';
import useAuthStore from '@/entities/auth/model/auth.store';
import type {
  PromptRequest,
} from '@/features/game-session/model/types';

// API 명세서에 맞는 새 게임 생성 payload
type CreateGamePayload = {
  backround: string; // API 명세서에서는 오타가 있음 (background -> backround)
  characterName: string;
  characterDescription: string;
  itemDefId: number;
};

type CreateGameResponse = {
  success: boolean;
  gameId: string;
  message: string;
};

export const createGameSession = async (payload: {
  background: string;
  name: string;
  trait: string;
  itemId: string;
}) => {
  // API 명세서에 맞게 변환
  const apiPayload: CreateGamePayload = {
    backround: payload.background,
    characterName: payload.name,
    characterDescription: payload.trait,
    itemDefId: parseInt(payload.itemId),
  };

  return customFetch<CreateGameResponse>('/games', {
    method: 'POST',
    body: apiPayload,
  });
};

export const getGameSession = async (gameId: string) => {
  console.log('🎮 게임 세션 조회 요청:', gameId);
  
  const token = useAuthStore.getState().accessToken;
  
  // 실제 API 호출로 변경 (Next.js 프록시 사용)
  const response = await fetch(`/api/games/${gameId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  console.log('📡 게임 세션 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    console.error('❌ 게임 세션 조회 실패:', errorData);
    throw new Error(errorData?.message || '게임 세션을 불러올 수 없습니다.');
  }

  const data = await response.json();
  console.log('✅ 게임 세션 조회 성공 - 전체 데이터:', data);
  console.log('📊 게임 세션 - sceneType:', data.sceneType);
  console.log('👤 플레이어 정보:', data.playerInfo);
  if (data.choiceInfo) {
    console.log('🔀 선택지 정보:', data.choiceInfo);
  }
  
  return data;
};

export const sendChoice = async (gameId: string, choiceIndex: number) => {
  console.log('🎯 선택지 선택 요청:', { gameId, choiceIndex });
  
  const token = useAuthStore.getState().accessToken;
  
  // 실제 선택지 선택 API 호출 (Next.js 프록시 사용)
  const response = await fetch(`/api/games/${gameId}/select`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      choiceIndex,
      customAction: null
    }),
  });

  console.log('📡 선택지 선택 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    console.error('❌ 선택지 선택 실패:', errorData);
    throw new Error(errorData?.message || '선택지 선택에 실패했습니다.');
  }

  const data = await response.json();
  console.log('✅ 선택지 선택 성공:', data);
  
  return data;
};

// 일반 게임 진행 (비선택지 상황에서의 다음 단계)
export const progressGame = async (gameId: string) => {
  console.log('⚡ 게임 진행 요청:', gameId);
  
  const token = useAuthStore.getState().accessToken;
  
  // 실제 게임 진행 API 호출 (Next.js 프록시 사용)
  const response = await fetch(`/api/games/${gameId}/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  console.log('📡 게임 진행 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    console.error('❌ 게임 진행 실패:', errorData);
    throw new Error(errorData?.message || '게임 진행에 실패했습니다.');
  }

  const data = await response.json();
  console.log('✅ 게임 진행 성공:', data);
  
  return data;
};

// 프롬프트는 별도 API가 없어 보이므로 임시로 진행 API 사용
export const sendPrompt = async (gameId: string, body: PromptRequest) => {
  console.log('💬 프롬프트 전송 요청:', { gameId, body });
  
  const token = useAuthStore.getState().accessToken;
  
  // 실제 게임 진행 API 호출 (Next.js 프록시 사용)
  const response = await fetch(`/api/games/${gameId}/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  console.log('📡 프롬프트 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    console.error('❌ 프롬프트 전송 실패:', errorData);
    throw new Error(errorData?.message || '프롬프트 전송에 실패했습니다.');
  }

  const data = await response.json();
  console.log('✅ 프롬프트 전송 성공:', data);
  
  return data;
};

// 상점 아이템 구매
export const buyShopItem = async (gameId: string, shopItemId: string) => {
  console.log('🛒 아이템 구매 요청:', { gameId, shopItemId });
  
  const token = useAuthStore.getState().accessToken;
  
  // 아이템 구매 API 호출 (실제 API 명세에 따라)
  // Path에는 shopItemId, Request Body에는 itemDefId를 넣어야 함
  const response = await fetch(`/api/games/${gameId}/items/purchase/${shopItemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ 
      itemDefId: parseInt(shopItemId) // shopItemId를 숫자로 변환해서 itemDefId로 전송
    }),
  });

  console.log('📡 아이템 구매 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    console.error('❌ 아이템 구매 실패:', errorData);
    throw new Error(errorData?.message || '아이템 구매에 실패했습니다.');
  }

  const data = await response.json();
  console.log('✅ 아이템 구매 성공:', data);
  
  return data;
};

// 인벤토리 아이템 판매
export const sellInventoryItem = async (gameId: string, itemId: string) => {
  console.log('💰 아이템 판매 요청:', { gameId, itemId });
  
  const token = useAuthStore.getState().accessToken;
  
  // 아이템 판매 API 호출 (실제 API 명세에 따라)
  const response = await fetch(`/api/games/${gameId}/items/sell/${itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    // Request Body는 없음 (API 명세에 따라)
  });

  console.log('📡 아이템 판매 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    console.error('❌ 아이템 판매 실패:', errorData);
    throw new Error(errorData?.message || '아이템 판매에 실패했습니다.');
  }

  const data = await response.json();
  console.log('✅ 아이템 판매 성공:', data);
  
  return data;
};

// 게임 종료 시 히스토리 생성
export const createGameHistory = async (gameId: string) => {
  console.log('📈 게임 히스토리 생성 요청:', gameId);
  
  const token = useAuthStore.getState().accessToken;
  
  // 히스토리 생성 API 호출 (Next.js 프록시 사용)
  const response = await fetch(`/api/games/${gameId}/history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}), // Request Body가 비어있음
  });

  console.log('📡 히스토리 생성 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    console.error('❌ 히스토리 생성 실패:', errorData);
    throw new Error(errorData?.message || '히스토리 생성에 실패했습니다.');
  }

  const data = await response.json();
  console.log('✅ 히스토리 생성 성공:', data);
  
  return data;
};

// 인벤토리 아이템 사용 (소모품 등) - 백엔드에 구현되지 않음
export const useInventoryItem = async (gameId: string, itemId: string) => {
  console.log('🧪 아이템 사용 요청:', { gameId, itemId });
  
  // 임시로 에러를 던져서 사용자에게 알림
  throw new Error('아이템 사용 기능은 아직 구현되지 않았습니다.');
};

// 인벤토리 아이템 버리기
export const dropInventoryItem = async (gameId: string, itemId: string) => {
  console.log('🗑️ 아이템 버리기 요청:', { gameId, itemId });
  
  const token = useAuthStore.getState().accessToken;
  
  // 아이템 버리기 API 호출 - 올바른 경로 사용
  const response = await fetch(`/api/games/dropItem/${gameId}/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  console.log('📡 아이템 버리기 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    console.error('❌ 아이템 버리기 실패:', errorData);
    throw new Error(errorData?.message || '아이템 버리기에 실패했습니다.');
  }

  // 204 No Content나 200 OK 모두 처리
  if (response.status === 204) {
    console.log('✅ 아이템 버리기 성공 (No Content)');
    return { success: true };
  }

  const data = await response.json();
  console.log('✅ 아이템 버리기 성공:', data);
  
  return data;
};

// 아이템 장착/해제 토글
export const toggleEquipItem = async (gameId: string, itemId: string) => {
  console.log('⚔️ 아이템 장착/해제 요청:', { gameId, itemId });
  
  const token = useAuthStore.getState().accessToken;
  
  // 아이템 장착/해제 API 호출 - 올바른 경로 사용
  const response = await fetch(`/api/games/equipItem/${gameId}/${itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  console.log('📡 아이템 장착/해제 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    console.error('❌ 아이템 장착/해제 실패:', errorData);
    throw new Error(errorData?.message || '아이템 장착/해제에 실패했습니다.');
  }

  const data = await response.json();
  console.log('✅ 아이템 장착/해제 성공:', data);
  
  return data;
};