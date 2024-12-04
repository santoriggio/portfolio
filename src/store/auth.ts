import { create } from "zustand";

type User = {
  id: number;
  email: string;
  username:string
};

type Store = {
  id: number;
  user: User | null;
};
export const auth = create<Store>((set, get) => ({
  id: -1,
  user: null,
  
}));
