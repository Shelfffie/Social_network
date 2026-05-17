"use server";

import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import { AuthFormInputs } from "./utils/types";

export async function loginActions(data: AuthFormInputs) {
  {
    //додати валідацію зод

    try {
    } catch (error) {
      catchErrorHandler(error);
    }
  }
}

export async function signupActions(data: AuthFormInputs) {
  {
    //додати валідацію зод

    try {
    } catch (error) {
      catchErrorHandler(error);
    }
  }
}
