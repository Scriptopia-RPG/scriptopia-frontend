import { useMutation } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';

import type { EmailPayload } from './use-email-duplicate-check.mutation';

interface EmailCodeVerifyPayload extends EmailPayload {
  code: string;
}

interface EmailCodeVerifyResponse {
  message: string;
}

const verifyEmailCode = async (payload: EmailCodeVerifyPayload) => {
  return customFetch<EmailCodeVerifyResponse>('/auth/email/code/verify', {
    method: 'POST',
    body: payload,
  });
};

export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: verifyEmailCode,
    retry: false,
  });
};
