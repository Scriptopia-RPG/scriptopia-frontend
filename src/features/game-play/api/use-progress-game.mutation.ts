import { useMutation } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import type { SceneData } from '@/entities/game/model/game-play.type';

export const useProgressGame = (gameUuid: string) => {
  return useMutation({
    mutationFn: async (): Promise<SceneData> => {
      return customFetch<SceneData>(`/games/${gameUuid}/progress`, {
        method: 'POST',
      });
    },
    retry: false,
  });
};

