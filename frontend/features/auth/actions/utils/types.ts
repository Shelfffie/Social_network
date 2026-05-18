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
