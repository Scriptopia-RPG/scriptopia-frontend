import { http, HttpResponse } from 'msw';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    console.log('Mock API received:', { email, password });

    if (email === "test@test.com" && password === "test") {
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
  http.get(`${baseUrl}/test`, () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];
