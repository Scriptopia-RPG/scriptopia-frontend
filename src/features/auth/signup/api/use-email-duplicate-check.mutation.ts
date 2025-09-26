import { useMutation } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';

export interface EmailPayload {
  email: string;
}

export interface EmailDuplicateResponse {
  message: string;
}

const verifyEmailDuplicate = async (payload: EmailPayload) => {
  return customFetch<EmailDuplicateResponse>('/auth/email/verify', {
    method: 'POST',
    body: payload,
  });
};

export const useEmailDuplicateCheck = () => {
  return useMutation({
    mutationFn: verifyEmailDuplicate,
    retry: false,
  });
};
