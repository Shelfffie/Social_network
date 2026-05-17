export interface AuthFormProps {
  mode: "login" | "signup";
}

export interface AuthFormInputs {
  email: string;
  username?: string;
  password: string;
  repeatPassword?: string;
  showThePassword: boolean;
}
