import { http, HttpResponse } from 'msw';

export const auth = [
  http.post('*/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (email === 'test@test.com' && password === 'test') {
      return HttpResponse.json({
        accessToken: 'mock.access.token.123',
        expiresIn: 60 * 30,
        role: 'USER',
      });
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }
  }),
];
