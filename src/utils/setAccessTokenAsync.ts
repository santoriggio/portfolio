import * as SecureStore from "expo-secure-store";

export const setAccessTokenAsync = async (token: string) => {
  await SecureStore.setItemAsync("accessToken", token);
};
