import { http, HttpResponse } from 'msw';

import { MOCK_PIA_SHOP_ITEMS } from '@/shared/api/fixtures/pia-shop.mock';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? '';

export const piaShop = [
  http.get(`${BASE_URL}/shops/pia/items`, () => {
    return HttpResponse.json(
      {
        items: MOCK_PIA_SHOP_ITEMS,
      },
      { status: 200 },
    );
  }),

  http.get(`${BASE_URL}/users/me/pia`, () => {
    return HttpResponse.json(
      {
        pia: 150000,
      },
      { status: 200 },
    );
  }),

  http.post(`${BASE_URL}/shops/pia/purchase`, async ({ request }) => {
    const body = (await request.json()) as { itemId: number; quantity: number };

    // Mock 로직: 아이템 ID가 유효한지 확인
    const item = MOCK_PIA_SHOP_ITEMS.find((i) => i.id === body.itemId);
    if (!item) {
      return HttpResponse.json(
        {
          success: false,
          message: '아이템을 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    // Mock: 항상 성공
    return HttpResponse.json(
      {
        success: true,
        message: '구매가 완료되었습니다.',
      },
      { status: 200 },
    );
  }),
];
