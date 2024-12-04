import { createApiHandler } from "./utils";
import { API } from "./utils/config";
import { handleApiAction } from "./utils/handleApiAction";

export const {
  useStore: useCreateStickerPackStore,
  request: requestCreateStickerPack,
  execute: executeCreateStickerPack,
} = createApiHandler(
  API.CREATE_STICKER_PACK,
  handleApiAction("success", (store, res) => {
    if (res) {
      store.setState({ state: { pack: res } });
    }
  }),
);
