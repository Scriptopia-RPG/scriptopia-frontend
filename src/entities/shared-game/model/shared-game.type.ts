export type SortKey =
  (typeof import('@/entities/shared-game/model/shared-game.constant').SORT_OPTIONS)[number]['key'];

export interface Tag {
  tagId: number;
  tagName: string;
}

export interface SharedGame {
  sharedGameUuid: string;
  thumbnail: string;
  title: string;
  totalPlayed: number;
  tags: ReadonlyArray<Tag>;
}
