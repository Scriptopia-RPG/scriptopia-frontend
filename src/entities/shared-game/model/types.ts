import { SORT_OPTIONS } from './constants';

export type SortKey = (typeof SORT_OPTIONS)[number]['key'];

export interface SharedGame {
  sharedGameId: number;
  thumbnailUrl: string;
  title: string;
  tags: string[];
}
