import type {
  SharedGame,
  SharedGameDetail,
  Tag,
} from '@/entities/shared-game/model/shared-game.type';

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
  thumbnailUrl: `https://picsum.photos/seed/${i + 1}/300/200`,
  title: `Game ${i + 1}`,
  playCount: getRandomInt(1000, 100000),
  tags: pickRandomTags(MOCK_TAG_NAMES),
}));

export const MOCK_SHARED_GAME_DETAIL: SharedGameDetail = {
  sharedGameUuid: '3a91f5d8-32ab-4c7b-812a-91c9b92dfe8a',
  posterUrl: 'https://picsum.photos/seed/1/200/300',
  title: '99번째 열쇠',
  worldView:
    "폐허가 된 왕국의 마지막 비밀이 숨겨진 도서관, '고서관'. 오직 기억을 잃은 자만이 그 문을 열 수 있다.",
  backgroundStory:
    '당신은 어느 날, 버려진 고서관에서 눈을 뜹니다. 모든 출구는 잠겨 있고, 책 사이사이엔 괴이들이 숨어 있습니다. 탈출하려면 ‘99번째 열쇠’를 찾아야 합니다.',
  tags: [
    { tagId: 1, tagName: '로맨스판타지' },
    { tagId: 2, tagName: '탈출' },
    { tagId: 3, tagName: '괴이' },
  ],
  creator: '탈출러',
  playCount: 1248,
  likeCount: 317,
  topScores: [
    {
      nickname: 'solaris',
      profileUrl: 'https://robohash.org/solaris',
      score: 19789,
      createdAt: '2025-09-13T18:32:21.017Z',
    },
    {
      nickname: 'hana_dev',
      profileUrl: 'https://robohash.org/hana_dev',
      score: 1283,
      createdAt: '2025-09-12T11:20:04.511Z',
    },
    {
      nickname: 'myst_reader',
      profileUrl: 'https://robohash.org/myst_reader',
      score: 684,
      createdAt: '2025-09-10T07:48:11.943Z',
    },
  ],
  sharedAt: '2025-09-07T15:00:00.000Z',
};
