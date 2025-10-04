export type SortKey =
  (typeof import('@/entities/shared-game/model/shared-game.constant').SORT_OPTIONS)[number]['key'];

export interface Tag {
  tagId: number;
  tagName: string;
}

export interface SharedGame {
  sharedGameUuid: string;
  thumbnailUrl: string;
  title: string;
  playCount: number;
  tags: ReadonlyArray<Tag>;
}

interface TopScore {
  nickname: string;
  profileUrl: string;
  score: number;
  createdAt: string;
}

export interface SharedGameDetail {
  sharedGameUuid: string;
  posterUrl: string;
  title: string;
  worldView: string;
  backgroundStory: string;
  tags: ReadonlyArray<Tag>;
  creator: string;
  playCount: number;
  likeCount: number;
  isLiked?: boolean;
  topScores: ReadonlyArray<TopScore>;
  sharedAt: string;
}
