"use server";

import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";

import { LoginSchema, SignUpSchema } from "../schemas/auth-schema";
import api from "@/lib/axios";
import * as z from "zod";
import { cookies } from "next/headers";
import { AuthFormInputs } from "../utils/types";

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
