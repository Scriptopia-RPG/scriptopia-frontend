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
];
