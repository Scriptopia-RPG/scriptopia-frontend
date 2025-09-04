import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import { Tag } from '@/entities/shared-game/model/shared-game.type';

export interface TagsResponse {
  tagNames: Tag[];
}

export const useTags = () => {
  const { data } = useQuery({
    queryKey: ['tags'],
    queryFn: () => customFetch<TagsResponse>('/games/shared/tags'),
  });

  return {
    tags: data?.tagNames ?? [],
  };
};
