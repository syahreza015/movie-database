import { create } from 'zustand';

interface IDrawerStore {
  openDrawer: boolean;
  setOpenDrawer: (newState: boolean) => void;
}

export const useDrawerStore = create<IDrawerStore>((set) => ({
  openDrawer: false,
  setOpenDrawer: (newState) => {
    set((state) => ({
      openDrawer: (state.openDrawer = newState),
    }));
  },
}));

interface ISearchStore {
  openSearch: boolean;
  setOpenSearch: (newState: boolean) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  openSearch: false,
  setOpenSearch: (newState) => {
    set((state) => ({
      openSearch: (state.openSearch = newState),
    }));
  },
}));
