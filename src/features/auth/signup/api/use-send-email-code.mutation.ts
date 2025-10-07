import { useMutation } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';

import type { EmailPayload } from './use-email-duplicate-check.mutation';

interface EmailCodeSendResponse {
  message: string;
  code?: string;
}

const sendEmailCode = async (payload: EmailPayload) => {
  return customFetch<EmailCodeSendResponse>('/auth/email/code/send', {
    method: 'POST',
    body: payload,
  });
};

export const useSendEmailCode = () => {
  return useMutation({
    mutationFn: sendEmailCode,
    retry: false,
  });
};
