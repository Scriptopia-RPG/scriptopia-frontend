import type {
  SharedGame,
  SharedGameDetail,
  Tag,
} from '@/entities/shared-game/model/shared-game.type';

export const MOCK_TAG_NAMES: Tag[] = [
  { id: 1, tagName: '로맨스' },
  { id: 2, tagName: '현대' },
  { id: 3, tagName: '추리' },
  { id: 4, tagName: '시뮬레이션' },
  { id: 5, tagName: '빙의' },
  { id: 6, tagName: '좀비' },
  { id: 7, tagName: '아포칼립스' },
  { id: 8, tagName: '아이돌' },
  { id: 9, tagName: '탐험' },
  { id: 10, tagName: '무협' },
  { id: 11, tagName: '힐링' },
  { id: 12, tagName: '판타지' },
  { id: 13, tagName: 'SF' },
  { id: 14, tagName: '게임' },
  { id: 15, tagName: '조선' },
  { id: 16, tagName: '히어로' },
  { id: 17, tagName: '던전' },
  { id: 18, tagName: '로맨스판타지' },
  { id: 19, tagName: '액션' },
  { id: 20, tagName: '전쟁' },
  { id: 21, tagName: '코믹' },
  { id: 22, tagName: '공포' },
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
  playCount: getRandomInt(1000, 100000),
  tags: pickRandomTags(MOCK_TAG_NAMES),
}));
