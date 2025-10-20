export interface MockAuthUser {
  email: string;
  password: string;
  nickname: string;
  role: 'USER' | 'ADMIN';
  ticket: number;
  ticketMax: number;
  pia: number;
  status: string;
}

export const MOCK_AUTH_USERS: MockAuthUser[] = [
  {
    email: 'test@test.com',
    password: 'test',
    nickname: 'Tester',
    role: 'USER',
    ticket: 3,
    ticketMax: 5,
    pia: 5000,
    status: '테스터'
  },
];

export interface MockEmailVerification {
  email: string;
  code: string;
  expiresAt: number;
  verified: boolean;
}

export const MOCK_EMAIL_VERIFICATIONS: MockEmailVerification[] = [];
