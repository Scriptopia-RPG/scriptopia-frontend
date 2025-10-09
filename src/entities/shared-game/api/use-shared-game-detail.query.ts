import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import { sharedGameKeys } from '@/entities/shared-game/api/shared-game.key';
import type { SharedGameDetail } from '@/entities/shared-game/model/shared-game.type';

export const useSharedGameDetail = (sharedGameUuid: string) => {
  const { data, isLoading } = useQuery({
    queryKey: sharedGameKeys.detail(sharedGameUuid),
    enabled: !!sharedGameUuid,
    queryFn: () => customFetch<SharedGameDetail>(`/shared-games/${sharedGameUuid}`),
  });

  return {
    sharedGameDetail: data,
    isLoading,
  };
};
