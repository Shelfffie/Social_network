import { UserType } from "@/features/utils/types/user";
import { Dispatch, SetStateAction } from "react";

export interface AuthFormProps {
  mode: "login" | "signup";
}

export interface AuthFormInputs {
  email: string;
  username?: string;
  password: string;
  confirmPassword?: string;
  showThePassword: boolean;
}

export interface AuthType {
  isLoggedIn: boolean;
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}
