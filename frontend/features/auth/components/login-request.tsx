"use client";

import z from "zod";
import { AuthFormInputs } from "../actions/utils/types";
import { LoginSchema } from "../schemas/auth-schema";
import api from "@/lib/axios";
import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";

export default function Login() {
  const handleLogin = async (data: AuthFormInputs) => {
    const parsed = LoginSchema.safeParse(data);

    if (!parsed.success)
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid data",
      };

    try {
      const response = await api.post(`/auth/sign-in`, parsed.data);
      const resData = response.data;

      return { success: true, data: resData };
    } catch (error) {
      return { success: false, error: catchErrorHandler(error) };
    }
  };

  return { handleLogin };
}
