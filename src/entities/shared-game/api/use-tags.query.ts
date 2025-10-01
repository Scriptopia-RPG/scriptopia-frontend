import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import { Tag } from '@/entities/shared-game/model/shared-game.type';

export const useTags = () => {
  const { data } = useQuery({
    queryKey: ['tags'],
    queryFn: () => customFetch<Tag[]>('/shared-games/tags'),
  });

  return {
    tags: data ?? [],
  };
};
