import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import type { SharedGameDetail } from '@/entities/shared-game/model/shared-game.type';

export const useSharedGameDetail = (sharedGameUuid: string) => {
  const { data } = useQuery({
    queryKey: ['shared-game', sharedGameUuid],
    enabled: !!sharedGameUuid,
    queryFn: () => customFetch<SharedGameDetail>(`/shared-games/${sharedGameUuid}`),
  });

  return {
    sharedGameDetail: data,
  };
};
