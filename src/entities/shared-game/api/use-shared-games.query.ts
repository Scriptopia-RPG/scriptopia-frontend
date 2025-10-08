import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import { SORT_OPTIONS } from '@/entities/shared-game/model/shared-game.constant';
import type { SharedGame, SortKey } from '@/entities/shared-game/model/shared-game.type';
import type { CursorRequest, CursorResponse } from '@/shared/types/pagination';

interface SharedGamesResponse extends CursorResponse {
  items: SharedGame[];
}

interface SharedGamesRequest extends CursorRequest {
  sort?: SortKey;
  tags?: number[];
  query?: string;
}

const buildQueryString = ({ sort, tags, query, lastUuid, pageSize }: SharedGamesRequest) => {
  const qs = new URLSearchParams();

  if (query) {
    qs.set('query', query);
  } else {
    qs.set('sort', sort ?? SORT_OPTIONS[0].key);
    if (tags?.length) {
      qs.set('tags', tags.join(','));
    }
  }

  if (lastUuid) qs.set('lastUuid', lastUuid);
  if (pageSize) qs.set('pageSize', String(pageSize));

  return qs.toString();
};

const getSharedGames = async (params: SharedGamesRequest): Promise<SharedGamesResponse> => {
  const queryString = buildQueryString(params);
  return customFetch<SharedGamesResponse>(`/shared-games?${queryString}`);
};

export const prefetchSharedGames = async (
  queryClient: QueryClient,
  params: Omit<SharedGamesRequest, 'lastUuid'>,
) => {
  return queryClient.prefetchInfiniteQuery({
    queryKey: ['shared-games', params],
    queryFn: () => getSharedGames(params),
    initialPageParam: {},
  });
};

export const useSharedGames = ({
  sort,
  tags,
  query,
  pageSize = 12,
}: Omit<SharedGamesRequest, 'lastUuid'>) => {
  return useInfiniteQuery({
    queryKey: ['shared-games', { sort, tags, query }],
    queryFn: ({ pageParam }) =>
      getSharedGames({
        sort,
        tags,
        query,
        pageSize,
        ...(pageParam ?? {}),
      }),
    initialPageParam: {},
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage && lastPage.lastUuid ? { lastUuid: lastPage.lastUuid } : undefined,
  });
};
