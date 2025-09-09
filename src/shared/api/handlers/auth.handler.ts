import { http, HttpResponse } from 'msw';

export const auth = [
  http.post('*/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    console.log('Mock API received:', { email, password });

    if (email === 'test@test.com' && password === 'test') {
      console.log('Mock API: Login successful');
      return HttpResponse.json({
        user: {
          id: 'abc-123',
          email: 'test@test.com',
          name: 'test',
        },
        token: 'mock-token',
      });
    } else {
      console.log('Mock API: Login failed');
      return new HttpResponse(null, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }
  }),
];
