import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  expiresIn: number | null;
  setAuth: (t: string, exp: number) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  expiresIn: null,
  setAuth: (t, exp) => set({ accessToken: t, expiresIn: Date.now() + exp * 1000 }),
  clearAuth: () => set({ accessToken: null, expiresIn: null }),
}));

export default useAuthStore;
