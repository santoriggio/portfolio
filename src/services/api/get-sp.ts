import { createApiHandler } from "./utils";
import { API } from "./utils/config";
import { handleApiAction } from "./utils/handleApiAction";

export const {
  useStore: useGetSpStore,
  request: requestGetSp,
  execute: executeGetSp,
} = createApiHandler(
  API.GET_SP,
  handleApiAction("success", (store, res) => {
    if (res) {
      store.setState({ state: { pack: res.pack } });
    }
  }),
  handleApiAction('error',(store,err)=>{
    console.error(err)
  })
);
