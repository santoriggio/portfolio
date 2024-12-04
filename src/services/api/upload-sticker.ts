import { createApiHandler } from "./utils";
import { API } from "./utils/config";

export const {
  useStore: useUploadStickerStore,
  request: requestUploadSticker,
  execute: executeUploadSticker,
} = createApiHandler(API.UPLOAD_STICKER);
