import { SortKey } from './types';

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'popular', label: '인기순' },
  { key: 'latest', label: '최신순' },
  { key: 'plays', label: '플레이순' },
  { key: 'score', label: '점수순' },
];
