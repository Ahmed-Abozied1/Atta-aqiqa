// store/profileStore.ts
import { create } from 'zustand';
import { User } from '@/lib/auth';

interface ProfileState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  updateUser: (updates) => set((state) => ({ 
    user: state.user ? { ...state.user, ...updates } : null 
  })),
  setIsLoading: (isLoading) => set({ isLoading }),
}));