import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import { sharedGameKeys } from '@/entities/shared-game/api/shared-game.key';
import type { Tag } from '@/entities/shared-game/model/shared-game.type';

export const useTags = () => {
  const { data } = useQuery({
    queryKey: sharedGameKeys.tags(),
    queryFn: () => customFetch<Tag[]>('/shared-games/tags'),
  });

  return {
    tags: Array.isArray(data) ? data : [],
  };
};
