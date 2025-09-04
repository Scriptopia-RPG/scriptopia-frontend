import type { SharedGame, Tag } from '@/entities/shared-game/model/shared-game.type';

export const MOCK_TAG_NAMES: Tag[] = [
  { tagId: 0, tagName: '로맨스' },
  { tagId: 1, tagName: '현대' },
  { tagId: 2, tagName: '공포' },
  { tagId: 3, tagName: '추리' },
  { tagId: 4, tagName: '시뮬레이션' },
  { tagId: 5, tagName: '빙의' },
  { tagId: 6, tagName: '좀비' },
  { tagId: 7, tagName: '아포칼립스' },
  { tagId: 8, tagName: '아이돌' },
  { tagId: 9, tagName: '탐험' },
  { tagId: 10, tagName: '무협' },
  { tagId: 11, tagName: '힐링' },
  { tagId: 12, tagName: '판타지' },
  { tagId: 13, tagName: 'SF' },
  { tagId: 14, tagName: '게임' },
  { tagId: 15, tagName: '조선' },
  { tagId: 16, tagName: '히어로' },
  { tagId: 17, tagName: '던전' },
  { tagId: 18, tagName: '로맨스판타지' },
  { tagId: 19, tagName: '액션' },
  { tagId: 20, tagName: '전쟁' },
  { tagId: 21, tagName: '코믹' },
];

const pickRandomTags = (all: Tag[]): Tag[] => {
  const count = Math.floor(Math.random() * 4) + 1; // 1~4개
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const MOCK_SHARED_GAMES: SharedGame[] = Array.from({ length: 60 }).map((_, i) => ({
  sharedGameUuid: String(i + 1),
  thumbnailUrl: `https://picsum.photos/seed/${i + 1}/300/200`,
  title: `Game ${i + 1}`,
  tags: pickRandomTags(MOCK_TAG_NAMES),
}));
