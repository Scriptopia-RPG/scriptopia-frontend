import { SORT_OPTIONS } from '@/entities/shared-game/model/shared-game.constant';

export type SortKey = (typeof SORT_OPTIONS)[number]['key'];

export interface Tag {
  tagId: number;
  tagName: string;
}

export interface SharedGame {
  sharedGameUuid: string;
  thumbnailUrl: string;
  title: string;
  tags: Tag[];
}
