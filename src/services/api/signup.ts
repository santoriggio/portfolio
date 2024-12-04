import { auth } from "@/store";
import { createApiHandler } from "./utils";
import { API } from "./utils/config";
import { handleApiAction } from "./utils/handleApiAction";
import { setAccessTokenAsync } from "@/utils";
import { router } from "expo-router";

export const {
  useStore: useSignupStore,
  request: requestSignup,
  execute: executeSignup,
} = createApiHandler(
  API.SIGNUP,
  handleApiAction("success", (store, res) => {
    if (res) {
      const user = {
        id: res.id,
        email: res.email,
        username: res.username
      };

      auth.setState({ user });
      store.setState({ state: user });

      setAccessTokenAsync(res.accessToken);
      //Reload stack
      router.replace("/");
    }
  }),
  handleApiAction("error", (store, err) => {
    console.error(err);
  }),
);
