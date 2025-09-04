import { SORT_OPTIONS } from '@/entities/shared-game/model/constants';

export type SortKey = (typeof SORT_OPTIONS)[number]['key'];

export interface SharedGame {
  sharedGameUuid: string;
  thumbnailUrl: string;
  title: string;
  tags: string[];
}
