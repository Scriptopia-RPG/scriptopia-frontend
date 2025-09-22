import { http, HttpResponse } from 'msw';

import { MOCK_AUTH_USERS } from '@/shared/api/fixtures/auth.mock';

const TOKEN_TTL = 60 * 30;

const createAccessToken = () => `mock.access.token.${Math.random().toString(36).slice(2, 10)}`;

const jsonError = (status: number, body: { code: string; message: string; status: string }) =>
  new HttpResponse(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,20}$/;

export const auth = [
  http.post('*/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    const user = MOCK_AUTH_USERS.find((item) => item.email === email && item.password === password);

    if (!user) {
      return new HttpResponse(null, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    return HttpResponse.json({
      accessToken: createAccessToken(),
      expiresIn: TOKEN_TTL,
      role: user.role,
    });
  }),

  http.post('*/auth/register', async ({ request }) => {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      nickname?: string;
    };

    const email = body.email?.trim();
    const password = body.password ?? '';
    const nickname = body.nickname?.trim();

    if (!email) {
      return jsonError(400, {
        code: 'E400001',
        message: '이메일은 필수 입력 값입니다.',
        status: 'BAD_REQUEST',
      });
    }

    if (!emailRegex.test(email)) {
      return jsonError(400, {
        code: 'E400002',
        message: '이메일 형식이 올바르지 않습니다.',
        status: 'BAD_REQUEST',
      });
    }

    if (!password) {
      return jsonError(400, {
        code: 'E400004',
        message: '비밀번호는 필수 입력 값입니다.',
        status: 'BAD_REQUEST',
      });
    }

    if (password.length < 8 || password.length > 20) {
      return jsonError(400, {
        code: 'E400005',
        message: '비밀번호는 8~20자리여야 합니다.',
        status: 'BAD_REQUEST',
      });
    }

    if (!passwordRegex.test(password)) {
      return jsonError(400, {
        code: 'E400006',
        message: '비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다.',
        status: 'BAD_REQUEST',
      });
    }

    if (!nickname) {
      return jsonError(400, {
        code: 'E400007',
        message: '닉네임은 필수 입력 값입니다.',
        status: 'BAD_REQUEST',
      });
    }

    const duplicatedEmail = MOCK_AUTH_USERS.some((item) => item.email === email);
    if (duplicatedEmail) {
      return jsonError(409, {
        code: 'E409001',
        message: '이미 사용 중인 이메일입니다.',
        status: 'CONFLICT',
      });
    }

    const duplicatedNickname = MOCK_AUTH_USERS.some((item) => item.nickname === nickname);
    if (duplicatedNickname) {
      return jsonError(409, {
        code: 'E409002',
        message: '이미 사용 중인 닉네임입니다.',
        status: 'CONFLICT',
      });
    }

    const newUser = {
      email,
      password,
      nickname,
      role: 'USER' as const,
      ticket: '0',
    };

    MOCK_AUTH_USERS.push(newUser);

    return HttpResponse.json(
      {
        accessToken: createAccessToken(),
        expiresIn: TOKEN_TTL,
        user: {
          email,
          nickname,
          role: newUser.role,
          ticket: newUser.ticket,
        },
      },
      { status: 201 },
    );
  }),
];
