import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import { sharedGameKeys } from '@/entities/shared-game/api/shared-game.key';
import type { SharedGameDetail } from '@/entities/shared-game/model/shared-game.type';

export const useSharedGameDetail = (sharedGameUuid: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: sharedGameKeys.detail(sharedGameUuid),
    enabled: !!sharedGameUuid,
    queryFn: () => customFetch<SharedGameDetail>(`/shared-games/${sharedGameUuid}`),
    retry: false, // 401 에러 시 자동 재시도 방지 (customFetch에서 이미 처리)
  });

  return {
    sharedGameDetail: data,
    isLoading,
    isError,
    error,
  };
};
