import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';

interface TagItem {
  tagId: number;
  tagName: string;
}

export interface TagsResponse {
  tagNames: TagItem[];
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
