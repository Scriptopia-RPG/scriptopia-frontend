import { useMutation } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import useAuthStore from '@/entities/auth/model/auth.store';

type Role = 'USER' | 'ADMIN';

interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

// API 명세서에 맞는 응답 구조
interface SignupResponse {
  accessToken: string;
  expiresIn: number;
  user: {
    email: string;
    nickname: string;
    role: string;
    ticket: string;
  };
}

// 내부에서 사용할 프로필 구조
interface UserProfile {
  email: string;
  nickname: string;
  role: Role;
  ticket: number;
  ticketMax: number;
  pia: number;
  status: string;
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
      // API 응답을 사용자 프로필 형식으로 변환
      const userProfile: UserProfile = {
        email: response.user.email,
        nickname: response.user.nickname,
        role: (response.user.role as Role) || 'USER',
        ticket: parseInt(response.user.ticket) || 3,
        ticketMax: 5,
        pia: 10000, // 신규 가입 보너스
        status: '법계획둑노예',
      };
      
      setAuth(response.accessToken, response.expiresIn, userProfile);
    },
    onError: (error: any) => {
      // 에러 처리 장화
      console.error('회원가입 실패:', error);
      
      let errorMessage = '회원가입에 실패했습니다.';
      
      if (error.response?.data?.code) {
        switch (error.response.data.code) {
          case 'E409001':
            errorMessage = '이미 사용 중인 이메일입니다.';
            break;
          case 'E409002':
            errorMessage = '이미 사용 중인 닉네임입니다.';
            break;
          case 'E400006':
            errorMessage = '비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다.';
            break;
          case 'E400005':
            errorMessage = '비밀번호는 8~20자리여야 합니다.';
            break;
          case 'E412001':
            errorMessage = '이메일 인증이 필요합니다.';
            break;
          default:
            errorMessage = error.response.data.message || errorMessage;
        }
      }
      
      throw new Error(errorMessage);
    },
  });
};
