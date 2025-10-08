import { useMutation, useQueryClient } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import type { SharedGameDetail } from '@/entities/shared-game/model/shared-game.type';

const likeSharedGame = async (sharedGameUuid: string) => {
  return customFetch(`/shared-games/${sharedGameUuid}/like`, {
    method: 'POST',
  });
};

export const useToggleLike = (sharedGameUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeSharedGame(sharedGameUuid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['shared-game', sharedGameUuid] });

      const prev = queryClient.getQueryData<SharedGameDetail>(['shared-game', sharedGameUuid]);

      if (prev) {
        const isLiked = prev.isLiked;
        const newLikeCount = prev.likeCount + (isLiked ? -1 : 1);

        queryClient.setQueryData<SharedGameDetail>(['shared-game', sharedGameUuid], {
          ...prev,
          isLiked: !isLiked,
          likeCount: newLikeCount,
        });
      }

      return { prev };
    },
    onError: (err, _, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['shared-games', sharedGameUuid], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['shared-games', sharedGameUuid] });
    },
  });
};
