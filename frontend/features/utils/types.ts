export type AuthState = {
  user: any;
  loading: boolean;
  error: string | null;
};

export type AuthAction =
  | {
      type: "AUTH_START";
    }
  | { type: "AUTH_SUCCESS"; payload: AuthState["user"] }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" };
