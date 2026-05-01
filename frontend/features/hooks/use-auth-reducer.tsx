import { useReducer } from "react";
import { AuthAction, AuthState } from "../utils/types";

export const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

export default function authReducer(
  state: AuthState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "AUTH_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };

    case "AUTH_ERROR":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
