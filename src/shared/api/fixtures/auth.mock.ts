export interface MockAuthUser {
  email: string;
  password: string;
  nickname: string;
  role: 'USER' | 'ADMIN';
  ticket: string;
}

export const MOCK_AUTH_USERS: MockAuthUser[] = [
  {
    email: 'test@test.com',
    password: 'test',
    nickname: 'Tester',
    role: 'USER',
    ticket: '3',
  },
];

export interface MockEmailVerification {
  email: string;
  code: string;
  expiresAt: number;
  verified: boolean;
}

export const MOCK_EMAIL_VERIFICATIONS: MockEmailVerification[] = [];
