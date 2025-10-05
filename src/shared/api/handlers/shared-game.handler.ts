import { http, HttpResponse } from 'msw';

import { parseTagIds } from '@/shared/utils/parse-tag-ids';
import {
  MOCK_TAG_NAMES,
  MOCK_SHARED_GAMES,
  MOCK_SHARED_GAME_DETAIL,
} from '@/shared/api/fixtures/shared-game.mock';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? '';

const parseBool = (v: string | null) => (v === 'true' ? true : v === 'false' ? false : undefined);

export const sharedGame = [
  http.get(`${BASE_URL}/shared-games/tags`, () => {
    return HttpResponse.json(MOCK_TAG_NAMES, { status: 200 });
  }),

  http.get(`${BASE_URL}/shared-games`, ({ request }) => {
    const url = new URL(request.url);
    const sp = url.searchParams;

    // 탐색/검색 파라미터
    const mode = sp.get('mode') ?? undefined; // 선택 사항
    const sort = sp.get('sort') ?? 'popular';
    const tagIds = parseTagIds(sp.get('tags'));
    const query = sp.get('query') || '';

    // 커서 파라미터
    const isFirstPage = parseBool(sp.get('isFirstPage'));
    const lastUuid = sp.get('lastUuid') || undefined;
    const pageSize = Number(sp.get('pageSize') ?? 12);

    // 1) 전체 복사
    let items = [...MOCK_SHARED_GAMES];

    // 2) 모드 판단 (search면 sort/tags 무시 규칙이라면 여기에 반영)
    const isSearchMode = mode === 'search' || (!!query && mode !== 'filter');

    // 3) 정렬 (예시)
    if (!isSearchMode) {
      if (sort === 'latest') {
        items.reverse();
      }
    }

    // 4) 태그 필터
    items = items.filter((g) => (tagIds ?? []).every((id) => g.tags.some((t) => t.tagId === id)));

    // 5) 검색
    if (isSearchMode && query) {
      const q = query.toLowerCase();
      items = items.filter((g) => g.title.toLowerCase().includes(q));
    }

    // 6) 커서 슬라이스
    let startIdx = 0;
    if (isFirstPage === false && lastUuid) {
      const idx = items.findIndex((g) => g.sharedGameUuid === lastUuid);
      startIdx = idx >= 0 ? idx + 1 : 0;
    }
    const pageItems = items.slice(startIdx, startIdx + pageSize);

    const hasNextPage = startIdx + pageSize < items.length;
    const nextLastUuid = pageItems.length
      ? pageItems[pageItems.length - 1].sharedGameUuid
      : lastUuid;

    // 7) 응답 (프론트 타입과 일치)
    return HttpResponse.json(
      {
        items: pageItems,
        hasNextPage,
        lastUuid: hasNextPage ? nextLastUuid : undefined,
      },
      { status: 200 },
    );
  }),

  http.get(`${BASE_URL}/shared-games/:sharedGameUuid`, () => {
    return HttpResponse.json(MOCK_SHARED_GAME_DETAIL, { status: 200 });
  }),
];
