import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Session {
  token: string;
}

interface AuthState {
  session: Session | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  anonymousLoginCode: string | null;
  setAnonymousLoginCode: (code: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      isAuthenticated: false,
      userEmail: null,
      anonymousLoginCode: null,

      login: (token: string) =>
        set({ session: { token }, isAuthenticated: true }),
      logout: () =>
        set({
          session: null,
          isAuthenticated: false,
          userEmail: null,
          anonymousLoginCode: null,
        }),
      setUserEmail: (email: string | null) => set({ userEmail: email }),
      setAnonymousLoginCode: (code: string | null) =>
        set({ anonymousLoginCode: code }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
