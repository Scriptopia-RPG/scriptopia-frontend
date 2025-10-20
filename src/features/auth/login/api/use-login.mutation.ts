import useAuthStore from '@/entities/auth/model/auth.store';
import { getDeviceId } from '@/shared/utils/device-id';
import { useMutation } from '@tanstack/react-query';

type Role = 'USER' | 'ADMIN';

interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
}

// 실제 API 응답 구조
interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  role: Role;
}

// 로그인 전용 fetch 함수 (Next.js 프록시 사용)
const loginFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
  const response = await fetch(`/api/auth/login`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    const error = {
      status: response.status,
      statusText: response.statusText,
      response: { data: errorData },
      url
    };
    
    throw error;
  }

  return response.json();
};

const login = async (loginData: Omit<LoginRequest, 'deviceId'>) => {
  const deviceId = getDeviceId();
  
  return await loginFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      ...loginData,
      deviceId,
    }),
  });
};

export const useLogin = () => {
  const { setAuth } = useAuthStore.getState();
  return useMutation({
    mutationFn: login,
    retry: false,
    onSuccess: (res, variables) => {
      // 실제 API 응답 데이터 확인을 위한 로그
      console.log('🎉 로그인 성공! API 응답 데이터:', res);
      
      // 실제 API는 사용자 정보를 따로 주지 않으므로 기본값으로 설정
      const userProfile = {
        email: variables.email,
        nickname: '사용자',
        role: res.role,
        ticket: 3,
        ticketMax: 5,
        pia: 5000,
        status: res.role === 'USER' ? '법계획둑노예' : '관리자',
      };
      
      console.log('👤 생성된 사용자 프로필:', userProfile);
      
      setAuth(res.accessToken, res.expiresIn, userProfile);
      console.log('✅ Auth Store에 저장 완료');
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error);
      
      let errorMessage = '로그인에 실패했습니다.';
      
      if (error.response?.data?.code) {
        switch (error.response.data.code) {
          case 'E401001':
            errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
            break;
          case 'E400001':
            errorMessage = '이메일을 입력해주세요.';
            break;
          case 'E400004':
            errorMessage = '비밀번호를 입력해주세요.';
            break;
          default:
            errorMessage = error.response.data.message || errorMessage;
        }
      }
      
      throw new Error(errorMessage);
    },
  });
};
