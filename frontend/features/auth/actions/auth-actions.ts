"use server";

import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import { AuthFormInputs } from "./utils/types";
import { LoginSchema, SignUpSchema } from "../schemas/auth-schema";
import api from "@/lib/axios";
import * as z from "zod";
import { cookies } from "next/headers";

export async function loginActions(data: AuthFormInputs) {
  {
    const parsed = LoginSchema.safeParse(data);
    console.log("data:", parsed.data);

    if (!parsed.success)
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid data",
      };

    const { loginIdentifier, password } = parsed.data;
    const isEmail = z.email().safeParse(loginIdentifier).success;
    const payload = isEmail
      ? { email: loginIdentifier, password }
      : { username: loginIdentifier, password };
    try {
      const response = await api.post(`/auth/sign-in`, payload);
      const resData = response.data;

      const rawCookies = response.headers["set-cookie"];

      if (rawCookies) {
        const cookieStore = await cookies();
        rawCookies.forEach((cookieStr) => {
          const [nameValue] = cookieStr.split(";");
          const [name, value] = nameValue.split("=");

          const isRefreshToken = name.trim() === "refresh_token";

          const maxAgeValue = isRefreshToken ? 7 * 24 * 60 * 60 : 15 * 60;

          cookieStore.set(name.trim(), value.trim(), {
            httpOnly: true,
            sameSite: "lax",
            maxAge: maxAgeValue,
            path: "/",
          });
        });
      }
      console.log(resData);
      return { success: true, data: resData };
    } catch (error) {
      return { success: false, error: catchErrorHandler(error) };
    }
  }
}

export async function signupActions(data: AuthFormInputs) {
  const parsed = SignUpSchema.safeParse(data);
  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid data",
    };
  try {
    const response = await api.post(`/auth/sign-up`, parsed.data);
    const resData = response.data;
    console.log(resData);
    return { success: true, data: resData };
  } catch (error) {
    return { success: false, error: catchErrorHandler(error) };
  }
}
