import useAuthStore from '@/entities/auth/model/auth.store';
import customFetch from '@/shared/api/custom-fetch';
import { useMutation } from '@tanstack/react-query';

interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
}

interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  role: 'USER' | 'ADMIN';
}

const login = async (loginData: LoginRequest) => {
  return await customFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: loginData,
  });
};

export const useLogin = () => {
  const { setAuth } = useAuthStore.getState();
  return useMutation({
    mutationFn: login,
    retry: false,
    onSuccess: (res) => {
      setAuth(res.accessToken, res.expiresIn);
    },
  });
};
