export type SendApiRequestOptions<A extends API> = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  endpoint?: string;
  request?: Request[A] | null;
  headers?: Record<string, string>;
  requireAuth?: boolean;
};

export enum API {
  GET_USERS,
  SIGNUP,
  SIGNIN,
  CREATE_STICKER_PACK,
  GET_USER_STICKER_PACK,
  GET_COMMUNITY_SP,
  GET_SP,
  UPLOAD_STICKER,
}

export type Request = {
  [API.GET_USERS]: {
    page?: number;
  };
  [API.SIGNUP]: {
    email: string;
    password: string;
  };
  [API.SIGNIN]: {
    email: string;
    password: string;
  };
  [API.CREATE_STICKER_PACK]: {
    title: string;
  };
  [API.GET_USER_STICKER_PACK]: undefined;

  [API.GET_COMMUNITY_SP]: undefined;
  [API.GET_SP]: {
    id: number;
  };
  [API.UPLOAD_STICKER]: {
    base64: string;
  };
};

export type Response = {
  [API.GET_USERS]: undefined;
  [API.SIGNUP]: {
    id: number;
    message: string;
    accessToken: string;
    email: string;
    username: string;
  };
  [API.SIGNIN]: {
    id: number;
    message: string;
    accessToken: string;
    email: string;
    username: string;
  };
  [API.CREATE_STICKER_PACK]: {
    id: number;
    users: any[];
  };
  [API.GET_USER_STICKER_PACK]: {
    list: any[];
  };
  [API.GET_COMMUNITY_SP]: {
    list: any[];
  };
  [API.GET_SP]: {
    pack: any;
  };
  [API.UPLOAD_STICKER]: {
    id: number;
  };
};

export const optionsMapping: Record<API, SendApiRequestOptions<any>> = {
  [API.GET_USERS]: {
    endpoint: "/users",
  },
  [API.SIGNUP]: {
    endpoint: "/auth/register",
    method: "POST",
  },
  [API.SIGNIN]: {
    endpoint: "/auth/login",
    method: "POST",
  },
  [API.CREATE_STICKER_PACK]: {
    endpoint: "/sticker-pack/create",
    method: "POST",
  },
  [API.GET_USER_STICKER_PACK]: {
    endpoint: "/sticker-pack/user",
    method: "GET",
  },
  [API.GET_COMMUNITY_SP]: {
    endpoint: "/sticker-pack/community",
    method: "GET",
  },
  [API.GET_SP]: {
    endpoint: "/sticker-pack/",
    method: "POST",
  },
  [API.UPLOAD_STICKER]: {
    endpoint: "/sticker/upload",
    method: "POST",
  },
};

export type State = {
  [API.GET_USERS]: {
    list: number;
  };
  [API.SIGNUP]: {
    id: number;
    email: string;
  };
  [API.SIGNIN]: {
    id: number;
    email: string;
  };
  [API.CREATE_STICKER_PACK]: {
    pack: {
      id: number;
      users: any[];
    };
  };
  [API.GET_USER_STICKER_PACK]: {
    list: any[];
  };
  [API.GET_COMMUNITY_SP]: {
    list: any[];
  };
  [API.GET_SP]: {
    pack: any;
  };
  [API.UPLOAD_STICKER]: {
    id: number;
  };
};

export type Store<A extends API> = {
  loading: boolean;
  error: Error | null;
  request: Request[A] | null;
  state: State[A] | null;
};

export type SendApiRequestReturn<A extends API> = {
  res: Response[A] | null;
  err: Error | null;
};
