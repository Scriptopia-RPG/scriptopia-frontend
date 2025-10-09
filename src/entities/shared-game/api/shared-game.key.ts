import type { SortKey } from '@/entities/shared-game/model/shared-game.type';

interface SharedGamesParams {
  sort?: SortKey;
  tags?: number[];
  query?: string;
}

export const sharedGameKeys = {
  all: ['shared-game'] as const,

  lists: () => [...sharedGameKeys.all, 'list'] as const,
  list: (params: SharedGamesParams) => [...sharedGameKeys.lists(), params] as const,

  details: () => [...sharedGameKeys.all, 'detail'] as const,
  detail: (uuid: string) => [...sharedGameKeys.details(), uuid] as const,

  tags: () => [...sharedGameKeys.all, 'tags'] as const,
};
