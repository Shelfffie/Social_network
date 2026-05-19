"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputBasic } from "@/features/components/input";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { AuthFormInputs, AuthFormProps } from "../actions/utils/types";
import { loginActions, signupActions } from "../actions/auth-actions";
import { useAuth } from "@/features/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: AuthFormProps) {
  const [inputFieldsValue, setInputFieldsValue] = useState<AuthFormInputs>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    showThePassword: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const { setUser } = useAuth();
  const router = useRouter();

  const isLogin = mode === "login";

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFieldsValue((prev) => ({ ...prev, [name]: value }));
  };

  const hadnleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const payload = isLogin
      ? {
          loginIdentifier: inputFieldsValue.email || inputFieldsValue.username,
          password: inputFieldsValue.password,
        }
      : inputFieldsValue;
    const res = isLogin
      ? await loginActions(payload as any)
      : await signupActions(payload as any);
    setLoading(false);
    if (!res.success) {
      console.log(res.error);
      setError(res.error);
    } else {
      //temporary
      console.log("success!!!!!!!");
      setUser(res.data);
      router.replace("/");
    }
  };

  return (
    <div className="flex flex-col justify-center  items-center w-full h-screen">
      <form
        className="flex flex-col items-center justify-center gap-5 w-full max-w-sm pt-5 pb-5 rounded-md bg-indigo-50"
        onSubmit={hadnleSubmit}
      >
        <h1 className="text-2xl">{isLogin ? "Login" : "Sign up"}</h1>
        <div className="flex flex-col gap-5 w-10/12">
          <div>
            <p className="ml-5">Email:</p>
            <InputBasic
              placeholder="Enter email"
              name="email"
              value={inputFieldsValue.email}
              onChange={handleInput}
              type="email"
            />
          </div>
          {!isLogin && (
            <div>
              <p className="ml-5">Username:</p>
              <InputBasic
                placeholder="Enter username"
                name="username"
                value={inputFieldsValue.username}
                onChange={handleInput}
              />
            </div>
          )}
          <div>
            <p className="ml-5">Password:</p>
            <InputBasic
              placeholder="Enter password"
              name="password"
              value={inputFieldsValue.password}
              onChange={handleInput}
              type={!inputFieldsValue.showThePassword ? "password" : "text"}
            />
          </div>
          {!isLogin && (
            <div>
              <p className="ml-5">Repeat password:</p>

              <InputBasic
                placeholder="Enter password"
                name="confirmPassword"
                value={inputFieldsValue.confirmPassword}
                onChange={handleInput}
                type={!inputFieldsValue.showThePassword ? "password" : "text"}
              />
            </div>
          )}
          <FieldGroup className="mx-auto w-72">
            <Field orientation="horizontal">
              <Checkbox
                className="bg-white border-indigo-600"
                id="terms-checkbox-desc"
                name="terms-checkbox-desc"
                onClick={() =>
                  setInputFieldsValue((prev) => ({
                    ...prev,
                    showThePassword: !prev.showThePassword,
                  }))
                }
              />
              <FieldContent>
                <FieldLabel htmlFor="terms-checkbox-desc">
                  Show the password
                </FieldLabel>
              </FieldContent>
            </Field>
          </FieldGroup>
        </div>

        <Button
          type="submit"
          className="bg-indigo-300 text-black h-10 w-10/12"
          disabled={loading}
        >
          {isLogin ? "Sign in" : "Sign up"}
        </Button>
      </form>
      {isLogin ? (
        <>
          <p className="text-sm">Don't have an account?</p>
          <Button variant="link">
            <Link href={"/sign-up"}>Sign up</Link>
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm">Already have an account?</p>
          <Button variant="link">
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
        </>
      )}
    </div>
  );
}
