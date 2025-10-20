import { useQuery } from '@tanstack/react-query';
import customFetch from '@/shared/api/custom-fetch';

export interface UserGameItem {
  name: string;
  description: string;
  picSrc: string;
  itemType: 'WEAPON' | 'ARMOR' | 'ACCESSORY';
  baseStat: number;
  strength: number;
  agility: number;
  intelligence: number;
  luck: number;
  mainStat: 'STRENGTH' | 'AGILITY' | 'INTELLIGENCE' | 'LUCK';
  grade: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  itemEffect: Array<{
    effectProbability: string;
    effectName: string;
    description: string;
  }>;
  remainingUses: number;
  price: number;
  // 사용자 아이템 UUID (백엔드에서 요구)
  id: string; // 사용자 아이템 UUID - 게임 생성 시 사용
}

type ItemCategory = 1 | 2 | 3; // 1: WEAPON, 2: ARMOR, 3: ACCESSORY

export const fetchUserItems = async (category?: ItemCategory): Promise<UserGameItem[]> => {
  const url = category 
    ? `/api/users/me/items/game?category=${category}`
    : '/api/users/me/items/game';

  const response = await customFetch(url, {
    method: 'GET',
  });
  
  // API 응답이 { items: [...] } 형태인지 확인
  const items = Array.isArray(response) ? response : response.items || [];
  
  // API 데이터를 게임 생성에서 사용하는 형식으로 변환
  return items.map((item: any, index: number) => ({
    id: item.userItemId ? item.userItemId.toString() : `user-item-${Date.now()}-${index}`, // userItemId를 id로 사용
    name: item.name,
    description: item.description,
    picSrc: item.picSrc,
    itemType: item.itemType || (item.category === 'WEAPON' ? 'WEAPON' : item.category === 'ARMOR' ? 'ARMOR' : 'ACCESSORY'),
    baseStat: item.baseStat || 0,
    strength: item.strength || 0,
    agility: item.agility || 0,
    intelligence: item.intelligence || 0,
    luck: item.luck || 0,
    mainStat: (item.mainStat || 'strength').toUpperCase(),
    grade: item.grade || 'COMMON',
    itemEffect: item.itemEffect || [],
    remainingUses: item.remainingUses || 0,
    price: item.price || 0,
  }));
};

export const useUserItems = (category?: ItemCategory) => {
  return useQuery({
    queryKey: ['user-items', category],
    queryFn: () => fetchUserItems(category),
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시
  });
};

export const useAllUserItems = () => {
  return useQuery({
    queryKey: ['user-items', 'all'],
    queryFn: () => fetchUserItems(),
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시
  });
};