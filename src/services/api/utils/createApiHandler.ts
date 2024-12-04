import { StoreApi, UseBoundStore, create } from "zustand";
import { API, Request, Response, Store } from "./config";

import { sendApiRequest } from "./sendApiRequest";

type SuccessAction<A extends API> = {
  type: "success";
  callback: (
    store: UseBoundStore<StoreApi<Store<A>>>,
    res: Response[A],
  ) => void;
};
type ErrorAction<A extends API> = {
  type: "error";
  callback: (store: UseBoundStore<StoreApi<Store<A>>>, err: Error) => void;
};

type Action<A extends API> = SuccessAction<A> | ErrorAction<A>;

export const createApiHandler = <A extends API>(
  api: A,
  ...actions: Action<A>[]
) => {
  const controller = create<Store<A>>(() => ({
    state: null,
    request: null,
    loading: false,
    error: null,
  }));

  return {
    useStore: controller,
    request: (request: Request[A]) => {
      controller.setState({ request });
    },
    execute: async () => {
      try {
        controller.setState({ loading: true });
        const { request } = controller.getState();
        const { res, err } = await sendApiRequest(api, { request });

        if (err) {
          throw err;
        }

        controller.setState({ error: null });

        for (const action of actions) {
          if (action.type === "success" && res) {
            action.callback(controller, res);
          }
        }
      } catch (error: any) {
        if (typeof error === "string") {
          controller.setState({ error: new Error(error) });
        } else if (error instanceof Error) {
          controller.setState({ error });
        }

        for (const action of actions) {
          if (action.type === "error") {
            action.callback(controller, error);
          }
        }
      } finally {
        controller.setState({ loading: false });
      }
    },
  };
};
