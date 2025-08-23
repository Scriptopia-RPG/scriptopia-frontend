import { http, HttpResponse } from 'msw';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/test`, () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),

  http.get('*/games/shared/tags', () => {
    const payload = {
      tagNames: [
        { tagId: 1, tagName: '로맨스' },
        { tagId: 2, tagName: '공포' },
        { tagId: 3, tagName: '추리' },
        { tagId: 4, tagName: '시뮬레이션' },
      ],
    };

    return HttpResponse.json(payload, { status: 200 });
  }),
];
