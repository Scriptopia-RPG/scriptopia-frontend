import { useInfiniteQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import type { SharedGame, SortKey } from '@/entities/shared-game/model/types';
import type { CursorRequest, CursorResponse } from '@/shared/types/pagination';

interface SharedGamesResponse extends CursorResponse {
  sharedGames: SharedGame[];
}

interface SharedGamesRequest extends CursorRequest {
  mode: 'filter' | 'search';
  sort?: SortKey;
  tags?: number[];
  query?: string;
}

const buildQueryString = ({
  mode,
  sort,
  tags,
  query,
  isFirstPage,
  lastUuid,
  pageSize,
}: SharedGamesRequest) => {
  const qs = new URLSearchParams();

  if (mode === 'filter') {
    qs.set('sort', sort ?? 'popular');
    if (tags?.length) {
      qs.set('tags', tags.join(','));
    }
  } else if (mode === 'search' && query) {
    qs.set('query', query);
  }

  if (isFirstPage) qs.set('isFirstPage', String(isFirstPage));
  if (lastUuid) qs.set('lastUuid', lastUuid);
  if (pageSize) qs.set('pageSize', String(pageSize));

  return qs.toString();
};

export const getSharedGames = async (params: SharedGamesRequest): Promise<SharedGamesResponse> => {
  const queryString = buildQueryString(params);
  return customFetch<SharedGamesResponse>(`/games/shared?${queryString}`);
};

export const useSharedGames = ({
  mode,
  sort,
  tags,
  query,
  pageSize = 10,
}: Omit<SharedGamesRequest, 'isFirstPage' | 'lastUuid'>) => {
  return useInfiniteQuery({
    queryKey: ['shared-games', { mode, sort, tags, query }],
    queryFn: ({ pageParam }) =>
      getSharedGames({
        mode,
        sort,
        tags,
        query,
        pageSize,
        ...(pageParam ?? { isFirstPage: true }),
      }),
    initialPageParam: { isFirstPage: true },
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage && lastPage.lastUuid
        ? { isFirstPage: false, lastUuid: lastPage.lastUuid }
        : undefined,
  });
};
