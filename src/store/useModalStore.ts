import { create } from 'zustand';

interface ModalStore {
  isOpen: boolean;
  view: string | null;
  data: any; 
  open: (view: string, data?: any) => void;
  close: () => void;
  setView: (view: string) => void;
  setData: (data: any) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  view: null,
  data: undefined,
  open: (view, data = undefined) =>
    set({
      view,
      isOpen: true,
      data,
    }),
  close: () => set({ 
    isOpen: false, 
    view: null, 
    data: undefined 
  }),
  setView: (view) => set({ view }),
  setData: (data) => set({ data }),
}));