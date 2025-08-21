import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/test', () => {
    return HttpResponse.json({
      postId: 1,
      content: `${1} Stop following me. I'm too famous.`,
    });
  }),
];
