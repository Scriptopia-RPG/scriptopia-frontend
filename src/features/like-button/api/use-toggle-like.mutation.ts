import { useMutation, useQueryClient } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import { sharedGameKeys } from '@/entities/shared-game/api/shared-game.key';
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
      await queryClient.cancelQueries({ queryKey: sharedGameKeys.detail(sharedGameUuid) });

      const prev = queryClient.getQueryData<SharedGameDetail>(
        sharedGameKeys.detail(sharedGameUuid),
      );

      if (prev) {
        const isLiked = prev.isLiked;
        const newLikeCount = prev.likeCount + (isLiked ? -1 : 1);

        queryClient.setQueryData<SharedGameDetail>(sharedGameKeys.detail(sharedGameUuid), {
          ...prev,
          isLiked: !isLiked,
          likeCount: newLikeCount,
        });
      }

      return { prev };
    },
    onError: (err, _, context) => {
      if (context?.prev) {
        queryClient.setQueryData(sharedGameKeys.detail(sharedGameUuid), context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: sharedGameKeys.detail(sharedGameUuid) });
    },
  });
};
