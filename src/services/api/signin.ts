import { auth } from "@/store";
import { createApiHandler } from "./utils";
import { API } from "./utils/config";
import { handleApiAction } from "./utils/handleApiAction";
import { router } from "expo-router";
import { setAccessTokenAsync } from "@/utils";

export const {
  useStore: useSigninStore,
  request: requestSignin,
  execute: executeSignin,
} = createApiHandler(
  API.SIGNIN,
  handleApiAction("success", (store, res) => {
    if (res) {
      console.log("Logged in ", res);

      const user = {
        id: res.id,
        email: res.email,
        username: res.username,
      };

      auth.setState({ user });
      store.setState({ state: user });

      setAccessTokenAsync(res.accessToken);
      //Reload stack
      router.replace("/");
    }
  }),
  handleApiAction("error", (store, err) => {
    console.log(err);
  }),
);
