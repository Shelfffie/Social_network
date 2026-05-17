"use server";

import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import { AuthFormInputs } from "./utils/types";
import { LoginSchema, SignUpSchema } from "../schemas/auth-schema";
import api from "@/lib/axios";
import { success } from "zod";

export async function loginActions(data: AuthFormInputs) {
  {
    const parsed = LoginSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error };
    try {
      const response = await api.post(`/auth/sign-in`, parsed.data);
      const resData = response.data;
      console.log(resData);
      return { success: true, data: resData };
    } catch (error) {
      return { success: false, error: catchErrorHandler(error) };
    }
  }
}

export async function signupActions(data: AuthFormInputs) {
  const parsed = SignUpSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error };
  try {
    const response = await api.post(`/auth/sign-up`, parsed.data);
    const resData = response.data;
    console.log(resData);
    return { success: true, data: resData };
  } catch (error) {
    return { success: false, error: catchErrorHandler(error) };
  }
}
