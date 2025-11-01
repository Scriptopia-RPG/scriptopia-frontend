import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import type { SceneData } from '@/entities/game/model/game-play.type';

export const fetchGamePlay = async (sessionId: string) => {
  return customFetch<SceneData>(`/games/${sessionId}`);
};

export const useGamePlay = (sessionId: string) => {
  return useQuery({
    queryKey: ['game-play', sessionId],
    queryFn: () => fetchGamePlay(sessionId),
    retry: false,
    enabled: !!sessionId,
  });
};
