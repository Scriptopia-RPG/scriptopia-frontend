import type { SharedGame, Tag } from '@/entities/shared-game/model/shared-game.type';

export const MOCK_TAG_NAMES: Tag[] = [
  { tagId: 1, tagName: '로맨스' },
  { tagId: 2, tagName: '현대' },
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
  { tagId: 22, tagName: '공포' },
];

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pickRandomTags = (all: Tag[]): Tag[] => {
  const count = getRandomInt(1, 4);
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const MOCK_SHARED_GAMES: SharedGame[] = Array.from({ length: 60 }).map((_, i) => ({
  sharedGameUuid: String(i + 1),
  thumbnail: `https://picsum.photos/seed/${i + 1}/300/200`,
  title: `Game ${i + 1}`,
  totalPlayed: getRandomInt(1000, 100000),
  tags: pickRandomTags(MOCK_TAG_NAMES),
}));
