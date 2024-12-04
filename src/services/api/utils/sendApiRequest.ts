import { getAccessTokenAsync } from "@/utils";
import {
  API,
  SendApiRequestOptions,
  SendApiRequestReturn,
  optionsMapping,
} from "./config";

export const sendApiRequest = async <A extends API>(
  api: A,
  options: SendApiRequestOptions<A>,
): Promise<SendApiRequestReturn<A>> => {
  const customOptions: SendApiRequestOptions<A> = {
    requireAuth: true,
    ...optionsMapping[api],
    ...options,
  };

  if (!customOptions.endpoint) {
    return {
      res: null,
      err: null,
    };
  }

  try {
    const url = "http://localhost:3000" + customOptions.endpoint;

    const access_token = await getAccessTokenAsync();

    const headers: Record<string, string> = {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      ...customOptions.headers,
    };

    if (!customOptions.requireAuth) {
      delete headers.Authorization;
    }

    const res = await fetch(url, {
      method: customOptions.method,
      headers,
      body: customOptions.request && JSON.stringify(customOptions.request),
    });


    if (res.status === 401) {
      throw "no_access";
    }

    const json = await res.json();

    if (json.error && json.message) {
      console.log(json.error);
      throw Error(json.message);
    }

    return { res: json, err: null };
  } catch (err: any) {
    return { res: null, err };
  }
};
