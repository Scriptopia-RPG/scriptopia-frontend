  import { useMutation } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import useAuthStore from '@/entities/auth/model/auth.store';

type Role = 'USER' | 'ADMIN';

interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

interface SignupResponse {
  accessToken: string;
  expiresIn: number;
  user: {
    email: string;
    nickname: string;
    role: Role;
    ticket: string;
  };
}

const signup = async (payload: SignupRequest) => {
  return customFetch<SignupResponse>('/auth/register', {
    method: 'POST',
    body: payload,
  });
};

export const useSignup = () => {
  const { setAuth } = useAuthStore.getState();

  return useMutation({
    mutationFn: signup,
    retry: false,
    onSuccess: (response) => {
      setAuth(response.accessToken, response.expiresIn);
    },
  });
};
