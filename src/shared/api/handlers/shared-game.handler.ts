import { http, HttpResponse } from 'msw';

export const sharedGame = [
  http.get('*/games/shared/tags', () => {
    const payload = {
      tagNames: [
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
      ],
    };

    return HttpResponse.json(payload, { status: 200 });
  }),

  http.get('*/games/shared', () => {
    const payload = {
      sharedGames: [
        {
          sharedGameId: 100000000001,
          thumbnailUrl: 'https://picsum.photos/seed/100000000001/400/600',
          title: '이세계 로그라이크: 마지막 용병',
          tags: ['로그라이크', '픽셀', 'RPG'],
        },
        {
          sharedGameId: 100000000002,
          thumbnailUrl: 'https://picsum.photos/seed/100000000002/400/600',
          title: '별의 항해자: 오로라의 서약',
          tags: ['SF', '어드벤처', '스토리'],
        },
        {
          sharedGameId: 100000000003,
          thumbnailUrl: 'https://picsum.photos/seed/100000000003/400/600',
          title: '그림자 도서관과 99개의 열쇠',
          tags: ['미스터리', '퍼즐'],
        },
        {
          sharedGameId: 100000000004,
          thumbnailUrl: 'https://picsum.photos/seed/100000000004/400/600',
          title: '네온던전: 글리치 시티',
          tags: ['액션', '사이버펑크', '메트로배니아'],
        },
        {
          sharedGameId: 100000000005,
          thumbnailUrl: 'https://picsum.photos/seed/100000000005/400/600',
          title: '모래시계의 주인',
          tags: ['턴제', 'SRPG', '판타지'],
        },
        {
          sharedGameId: 100000000006,
          thumbnailUrl: 'https://picsum.photos/seed/100000000006/400/600',
          title: '달빛 용병단',
          tags: ['RPG', '파티', '퀘스트'],
        },
        {
          sharedGameId: 100000000007,
          thumbnailUrl: 'https://picsum.photos/seed/100000000007/400/600',
          title: '침묵의 사원',
          tags: ['퍼즐', '어드벤처', '고난이도'],
        },
        {
          sharedGameId: 100000000008,
          thumbnailUrl: 'https://picsum.photos/seed/100000000008/400/600',
          title: '바다의 마녀와 등대지기',
          tags: ['스토리', '시뮬레이션', '힐링'],
        },
        {
          sharedGameId: 100000000009,
          thumbnailUrl: 'https://picsum.photos/seed/100000000009/400/600',
          title: '종이왕국 레브리움',
          tags: ['카드', '전략', '수집형'],
        },
        {
          sharedGameId: 100000000010,
          thumbnailUrl: 'https://picsum.photos/seed/100000000010/400/600',
          title: '칼날과 만년필',
          tags: ['액션', '스토리', '노벨'],
        },
        {
          sharedGameId: 100000000011,
          thumbnailUrl: 'https://picsum.photos/seed/100000000011/400/600',
          title: '잔향의 연금술사',
          tags: ['연금', '크래프팅', 'RPG'],
        },
        {
          sharedGameId: 100000000012,
          thumbnailUrl: 'https://picsum.photos/seed/100000000012/400/600',
          title: '천개의 문, 하나의 선택',
          tags: ['로그라이크', '선택지', '미스터리'],
        },
        {
          sharedGameId: 100000000013,
          thumbnailUrl: 'https://picsum.photos/seed/100000000013/400/600',
          title: '핀과 파편의 왕관',
          tags: ['메트로배니아', '픽셀'],
        },
        {
          sharedGameId: 100000000014,
          thumbnailUrl: 'https://picsum.photos/seed/100000000014/400/600',
          title: '용암호의 약속',
          tags: ['서바이벌', '크래프팅', '오픈월드'],
        },
        {
          sharedGameId: 100000000015,
          thumbnailUrl: 'https://picsum.photos/seed/100000000015/400/600',
          title: '은하수 경매전',
          tags: ['경매', '전략', '멀티'],
        },
        {
          sharedGameId: 100000000016,
          thumbnailUrl: 'https://picsum.photos/seed/100000000016/400/600',
          title: '유령상점 비밀야화',
          tags: ['시뮬레이션', '경영', '판타지'],
        },
        {
          sharedGameId: 100000000017,
          thumbnailUrl: 'https://picsum.photos/seed/100000000017/400/600',
          title: '고양이 사서의 모험',
          tags: ['힐링', '퍼즐', '스토리'],
        },
        {
          sharedGameId: 100000000018,
          thumbnailUrl: 'https://picsum.photos/seed/100000000018/400/600',
          title: '수면 아래의 도시',
          tags: ['호러', '어드벤처', 'TPS'],
        },
        {
          sharedGameId: 100000000019,
          thumbnailUrl: 'https://picsum.photos/seed/100000000019/400/600',
          title: '사막의 라디오',
          tags: ['스토리', '워킹시뮬레이터'],
        },
        {
          sharedGameId: 100000000020,
          thumbnailUrl: 'https://picsum.photos/seed/100000000020/400/600',
          title: '소금꽃의 기사',
          tags: ['소울라이크', '액션', '보스러시'],
        },
        {
          sharedGameId: 100000000021,
          thumbnailUrl: 'https://picsum.photos/seed/100000000021/400/600',
          title: '새벽 이후의 기록',
          tags: ['포스트아포칼립스', 'RPG'],
        },
        {
          sharedGameId: 100000000022,
          thumbnailUrl: 'https://picsum.photos/seed/100000000022/400/600',
          title: '바람술사의 시계',
          tags: ['퍼즐', '시간조작', '플랫폼'],
        },
        {
          sharedGameId: 100000000023,
          thumbnailUrl: 'https://picsum.photos/seed/100000000023/400/600',
          title: '검은 벼룩시장',
          tags: ['스텔스', '전략', '도둑질'],
        },
        {
          sharedGameId: 100000000024,
          thumbnailUrl: 'https://picsum.photos/seed/100000000024/400/600',
          title: '마분지 성채',
          tags: ['타워디펜스', '카드', '수집형'],
        },
        {
          sharedGameId: 100000000025,
          thumbnailUrl: 'https://picsum.photos/seed/100000000025/400/600',
          title: '유성 소나타',
          tags: ['리듬', '스토리'],
        },
        {
          sharedGameId: 100000000026,
          thumbnailUrl: 'https://picsum.photos/seed/100000000026/400/600',
          title: '빙설의 포식자',
          tags: ['서바이벌', '혹한', '크래프팅'],
        },
        {
          sharedGameId: 100000000027,
          thumbnailUrl: 'https://picsum.photos/seed/100000000027/400/600',
          title: '연의 탑',
          tags: ['로그라이크', '던전', '카드'],
        },
        {
          sharedGameId: 100000000028,
          thumbnailUrl: 'https://picsum.photos/seed/100000000028/400/600',
          title: '철새와 지도',
          tags: ['오픈월드', '탐험', '힐링'],
        },
        {
          sharedGameId: 100000000029,
          thumbnailUrl: 'https://picsum.photos/seed/100000000029/400/600',
          title: '망각의 바코드',
          tags: ['해킹', '퍼즐', '사이버펑크'],
        },
        {
          sharedGameId: 100000000030,
          thumbnailUrl: 'https://picsum.photos/seed/100000000030/400/600',
          title: '달의 경매장: 야추 편',
          tags: ['경매', '전략', '야추'],
        },
      ],
    };
    return HttpResponse.json(payload, { status: 200 });
  }),
];
