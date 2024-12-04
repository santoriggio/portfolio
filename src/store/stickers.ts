import { create } from "zustand";

type Store = {
  list: any[];
  add: (sticker: any) => void;
};
export const stickers = create<Store>((set, get) => ({
  list: [],
  add: (sticker) => {
    set((store) => ({ list: [...store.list, sticker] }));
  },
}));
