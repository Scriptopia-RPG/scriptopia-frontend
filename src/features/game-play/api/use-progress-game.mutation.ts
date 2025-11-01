import { useMutation } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import type { SceneData } from '@/entities/game/model/game-play.type';

export const useProgressGame = (gameId: string) => {
  return useMutation({
    mutationFn: async (): Promise<SceneData> => {
      return customFetch<SceneData>(`/games/${gameId}/progress`, {
        method: 'POST',
      });
    },
    retry: false,
  });
};
