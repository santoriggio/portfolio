import { StoreApi, UseBoundStore } from "zustand";
import { API, Store, Response } from "./config";

function handleApiAction<A extends API>(
  type: "error",
  callback: (store: UseBoundStore<StoreApi<Store<A>>>, err: Error) => void,
): {
  type: "error";
  callback: (store: UseBoundStore<StoreApi<Store<A>>>, err: Error) => void;
};

function handleApiAction<A extends API>(
  type: "success",
  callback: (
    store: UseBoundStore<StoreApi<Store<A>>>,
    res: Response[A],
  ) => void,
): {
  type: "success";
  callback: (
    store: UseBoundStore<StoreApi<Store<A>>>,
    res: Response[A],
  ) => void;
};

function handleApiAction<A extends API>(
  type: "success" | "error",
  callback:
    | ((store: UseBoundStore<StoreApi<Store<A>>>, err: Error) => void)
    | ((store: UseBoundStore<StoreApi<Store<A>>>, res: Response[A]) => void),
): {
  type: "success" | "error";
  callback:
    | ((store: UseBoundStore<StoreApi<Store<A>>>, err: Error) => void)
    | ((store: UseBoundStore<StoreApi<Store<A>>>, res: Response[A]) => void);
} {
  return { type, callback };
}

export { handleApiAction };
