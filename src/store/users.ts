import { create } from "zustand";

type User = {
  id: number;
  name: string;
  email: string;
};
type Store = {
  list: User[];
  hashmap: Record<string, number>;
  add: (user: User | User[]) => void;
};

export const users = create<Store>((set, get) => ({
  list: [],
  hashmap: {},
  add: (user) => {
    const { list, hashmap } = get();

    if (Array.isArray(user)) {
      for (const u of user) {
        const index =
          typeof hashmap[u.id.toString()] !== "undefined"
            ? hashmap[u.id.toString()]
            : list.length;
        list[index] = u;
        hashmap[u.id.toString()] = index;
      }

      set({ list, hashmap });
    } else {
      const u = user;
      const index =
        typeof hashmap[u.id.toString()] !== "undefined"
          ? hashmap[u.id.toString()]
          : list.length;
      list[index] = u;
      hashmap[u.id.toString()] = index;

      set({ list, hashmap });
    }
  },
}));
