import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  expiresIn: number | null;
  setAuth: (t: string, exp: number) => void;
  clearAuth: () => void;
  isLoggedIn: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      expiresIn: null,
      setAuth: (t, exp) => set({ accessToken: t, expiresIn: Date.now() + exp * 1000 }),
      clearAuth: () => set({ accessToken: null, expiresIn: null }),
      isLoggedIn: () => {
        const { accessToken, expiresIn } = get();
        return !!accessToken && !!expiresIn && Date.now() < expiresIn;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        expiresIn: state.expiresIn,
      }),
    },
  ),
);

export default useAuthStore;
