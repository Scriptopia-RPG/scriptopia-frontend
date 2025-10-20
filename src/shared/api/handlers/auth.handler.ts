import { http, HttpResponse, type JsonBodyType } from 'msw';

import { MOCK_AUTH_USERS, MOCK_EMAIL_VERIFICATIONS } from '@/shared/api/fixtures/auth.mock';

const TOKEN_TTL = 60 * 30;
const EMAIL_CODE_TTL_MS = 1000 * 60 * 5;

const createAccessToken = () => `mock.access.token.${Math.random().toString(36).slice(2, 10)}`;
const createVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const jsonResponse = <T extends JsonBodyType>(status: number, body: T) =>
  HttpResponse.json(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const jsonError = (status: number, body: { code: string; message: string; status: string }) =>
  new HttpResponse(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,20}$/;
const codeRegex = /^\d{6}$/;

const ensureValidEmail = (rawEmail?: string) => {
  const email = rawEmail?.trim() ?? '';

  if (!email) {
    return {
      error: jsonError(400, {
        code: 'E400001',
        message: '이메일을 입력해주세요.',
        status: 'BAD_REQUEST',
      }),
    } as const;
  }

  if (!emailRegex.test(email)) {
    return {
      error: jsonError(400, {
        code: 'E400002',
        message: '이메일 형식이 올바르지 않습니다.',
        status: 'BAD_REQUEST',
      }),
    } as const;
  }

  return { email } as const;
};

const upsertVerification = (email: string, code: string) => {
  const expiresAt = Date.now() + EMAIL_CODE_TTL_MS;
  const index = MOCK_EMAIL_VERIFICATIONS.findIndex((item) => item.email === email);

  if (index >= 0) {
    MOCK_EMAIL_VERIFICATIONS[index] = {
      email,
      code,
      expiresAt,
      verified: false,
    };
    return;
  }

  MOCK_EMAIL_VERIFICATIONS.push({
    email,
    code,
    expiresAt,
    verified: false,
  });
};

const getVerification = (email: string) => {
  return MOCK_EMAIL_VERIFICATIONS.find((item) => item.email === email);
};

const markVerified = (email: string) => {
  const entry = getVerification(email);
  if (entry) {
    entry.verified = true;
  }
};

export const auth = [
  // 로그인은 실제 API 사용하므로 MSW에서 제외
  
  http.post('*/auth/register', async ({ request }) => {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      nickname?: string;
    };

    const emailCheck = ensureValidEmail(body.email);
    if ('error' in emailCheck) {
      return emailCheck.error;
    }
    const email = emailCheck.email;

    const password = body.password ?? '';
    const nickname = body.nickname?.trim();

    if (!password) {
      return jsonError(400, {
        code: 'E400004',
        message: '비밀번호를 입력해주세요.',
        status: 'BAD_REQUEST',
      });
    }

    if (password.length < 8 || password.length > 20) {
      return jsonError(400, {
        code: 'E400005',
        message: '비밀번호는 8~20자 이어야 합니다.',
        status: 'BAD_REQUEST',
      });
    }

    if (!passwordRegex.test(password)) {
      return jsonError(400, {
        code: 'E400006',
        message: '비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다.',
        status: 'BAD_REQUEST',
      });
    }

    if (!nickname) {
      return jsonError(400, {
        code: 'E400007',
        message: '닉네임을 입력해주세요.',
        status: 'BAD_REQUEST',
      });
    }

    const duplicatedEmail = MOCK_AUTH_USERS.some((item) => item.email === email);
    if (duplicatedEmail) {
      return jsonError(409, {
        code: 'E409001',
        message: '이미 존재하는 이메일입니다.',
        status: 'CONFLICT',
      });
    }

    const duplicatedNickname = MOCK_AUTH_USERS.some((item) => item.nickname === nickname);
    if (duplicatedNickname) {
      return jsonError(409, {
        code: 'E409002',
        message: '이미 존재하는 닉네임입니다.',
        status: 'CONFLICT',
      });
    }

    const verification = getVerification(email);
    if (!verification || !verification.verified) {
      return jsonError(403, {
        code: 'E403001',
        message: '이메일 인증을 완료해주세요.',
        status: 'FORBIDDEN',
      });
    }

    const newUser = {
      email,
      password,
      nickname,
      role: 'USER' as const,
      ticket: 3,
      ticketMax: 5,
      pia: 5000,
      status: '인증 완료^',
    };

    MOCK_AUTH_USERS.push(newUser);

    return jsonResponse(201, {
      accessToken: createAccessToken(),
      expiresIn: TOKEN_TTL,
      user: {
        email,
        nickname,
        role: newUser.role,
        ticket: newUser.ticket,
        ticketMax: newUser.ticketMax,
        pia: newUser.pia,
        status: newUser.status,
      },
    });
  }),

  http.post('*/auth/email/verify', async ({ request }) => {
    const body = (await request.json()) as { email?: string };
    const emailCheck = ensureValidEmail(body.email);

    if ('error' in emailCheck) {
      return emailCheck.error;
    }

    const email = emailCheck.email;
    const duplicatedEmail = MOCK_AUTH_USERS.some((item) => item.email === email);

    if (duplicatedEmail) {
      return jsonError(409, {
        code: 'E409001',
        message: '이미 존재하는 이메일입니다.',
        status: 'CONFLICT',
      });
    }

    return jsonResponse(200, {
      message: '이메일 인증을 완료해주세요.',
    });
  }),

  http.post('*/auth/email/code/send', async ({ request }) => {
    const body = (await request.json()) as { email?: string };
    const emailCheck = ensureValidEmail(body.email);

    if ('error' in emailCheck) {
      return emailCheck.error;
    }

    const email = emailCheck.email;
    const duplicatedEmail = MOCK_AUTH_USERS.some((item) => item.email === email);
    if (duplicatedEmail) {
      return jsonError(409, {
        code: 'E409001',
        message: '이미 존재하는 이메일입니다.',
        status: 'CONFLICT',
      });
    }

    const code = createVerificationCode();
    upsertVerification(email, code);

    return jsonResponse(200, {
      message: '인증 코드를 발송해주세요.',
      code,
    });
  }),

  http.post('*/auth/email/code/verify', async ({ request }) => {
    const body = (await request.json()) as { email?: string; code?: string };
    const emailCheck = ensureValidEmail(body.email);

    if ('error' in emailCheck) {
      return emailCheck.error;
    }

    const email = emailCheck.email;
    const rawCode = body.code?.trim() ?? '';

    if (!codeRegex.test(rawCode)) {
      return jsonError(400, {
        code: 'E400003',
        message: '인증 코드는 6자리 숫자여야 합니다.',
        status: 'BAD_REQUEST',
      });
    }

    const verification = getVerification(email);

    if (!verification || verification.code !== rawCode || verification.expiresAt < Date.now()) {
      return jsonError(401, {
        code: 'E401002',
        message: '인증 코드가 일치하지 않습니다.',
        status: 'UNAUTHORIZED',
      });
    }

    markVerified(email);

    return jsonResponse(200, {
      message: '인증 코드를 완료해주세요.',
    });
  }),
];


