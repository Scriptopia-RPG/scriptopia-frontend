import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import { SharedGame, SortKey } from '@/entities/shared-game/model/types';

export interface SharedGamesResponse {
  sharedGames: SharedGame[];
}

interface SharedGamesParams {
  mode: 'filter' | 'search';
  sort?: SortKey;
  tags?: number[];
  query?: string;
}

const buildQueryString = ({ mode, sort, tags, query }: SharedGamesParams) => {
  const params = new URLSearchParams();

  if (mode === 'filter') {
    params.set('sort', sort ?? 'popular');
    if (tags && tags.length) {
      params.set('tags', tags.join(','));
    }
  } else if (mode === 'search') {
    if (query && query.trim()) {
      params.set('query', query.trim());
    }
  }

  return params.toString();
};

export const getSharedGames = async (params: SharedGamesParams): Promise<SharedGamesResponse> => {
  const queryString = buildQueryString(params);
  return customFetch<SharedGamesResponse>(`/games/shared?${queryString}`);
};

export const useSharedGames = (params: SharedGamesParams) => {
  return useQuery({
    queryKey: ['shared-games', params],
    queryFn: () => getSharedGames(params),
    enabled: params.mode === 'filter' || !!params.query?.trim(),
    select: (data) => data.sharedGames,
  });
};
