import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';

interface GameResponse {
  id: number;
  sessionId: string;
}

export const fetchGame = async () => {
  return customFetch<GameResponse>('/games/me');
};

export const useGame = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['game', 'me'],
    queryFn: fetchGame,
    retry: false,
    staleTime: 0,
    enabled: options?.enabled ?? true,
  });
};
