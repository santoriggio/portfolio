import { createApiHandler } from "./utils";
import { API } from "./utils/config";
import { handleApiAction } from "./utils/handleApiAction";

export const {
  useStore: useGetUserStickerPackStore,
  request: requestGetUserStickerPack,
  execute: executeGetUserStickerPack,
} = createApiHandler(
  API.GET_USER_STICKER_PACK,
  handleApiAction("success", (store, res) => {
    if (res) {
      store.setState({ state: { list: res.list } });
    }
  }),
);
