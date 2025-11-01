import { useMutation } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import type { SceneData } from '@/entities/game/model/game-play.type';

export interface SelectChoiceRequest {
  choiceIndex?: number;
  customAction?: string;
}

export const useSelectChoice = (gameUuid: string) => {
  return useMutation({
    mutationFn: async (data: SelectChoiceRequest): Promise<SceneData> => {
      return customFetch<SceneData>(`/games/${gameUuid}/select`, {
        method: 'POST',
        body: data,
      });
    },
    retry: false,
  });
};
