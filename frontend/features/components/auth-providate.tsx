import { useEffect, useReducer } from "react";
import authReducer, { initialState } from "../hooks/use-auth-reducer";

export default function AuthProvider() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch({ type: "AUTH_START" });

      try {
      } catch (error) {}
    };
  }, []);
}
