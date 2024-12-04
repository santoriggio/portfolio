import * as SecureStore from "expo-secure-store";

export const getAccessTokenAsync = async () => {
  return await SecureStore.getItemAsync("accessToken");
};
