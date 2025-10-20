import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  email: string;
  nickname: string;
  role: 'USER' | 'ADMIN';
  ticket: number;
  ticketMax: number;
  pia: number;
  status: string;
}

interface AuthState {
  accessToken: string | null;
  expiresAt: number | null;
  profile: UserProfile | null;
  setAuth: (token: string, expiresIn: number, profile: UserProfile) => void;
  clearAuth: () => void;
  isTokenValid: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      expiresAt: null,
      profile: null,
      setAuth: (token, expiresIn, profile) => {
        const expiresAt = Date.now() + expiresIn * 1000;
        console.log('🔒 토큰 저장:', { token: token.substring(0, 20) + '...', expiresAt: new Date(expiresAt) });
        set({ accessToken: token, expiresAt, profile });
      },
      clearAuth: () => {
        console.log('🚪 로그아웃 - 토큰 제거');
        set({ accessToken: null, expiresAt: null, profile: null });
      },
      isTokenValid: () => {
        const { accessToken, expiresAt } = get();
        const valid = !!(accessToken && expiresAt && Date.now() < expiresAt);
        console.log('🔍 토큰 유효성 검사:', { valid, expiresAt: expiresAt ? new Date(expiresAt) : null });
        return valid;
      },
    }),
    {
      name: 'scriptopia-auth', // localStorage key
      partialize: (state) => ({ 
        accessToken: state.accessToken,
        expiresAt: state.expiresAt,
        profile: state.profile 
      }),
    }
  )
);

export default useAuthStore;
