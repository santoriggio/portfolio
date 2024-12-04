import { lazy } from "react";
import { createApiHandler } from "./utils";
import { API } from "./utils/config";
import { handleApiAction } from "./utils/handleApiAction";

export const {
  useStore: useGetCommunityStore,
  request: requestGetCommunity,
  execute: executeGetCommunity,
} = createApiHandler(
  API.GET_COMMUNITY_SP,
  handleApiAction("success", (store, res) => {
    if (res) {
      store.setState({ state: { list: res.list } });
    }
  }),
);
