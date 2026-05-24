"use server";

import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import { EditInputValuesType } from "../utils/edit-types";
import api from "@/lib/axios";
import { EditProfileSchema } from "../schemas/edit-profile-schema";
import { revalidatePath } from "next/cache";

export async function SaveEditDataFunction(data: EditInputValuesType) {
  const parsed = EditProfileSchema.safeParse(data);

  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid data",
    };
  const { displayName, username, bio, icon } = parsed.data;
  const formData = new FormData();

  if (displayName !== undefined) formData.append("displayName", displayName);
  if (username !== undefined) formData.append("username", username);
  if (bio !== undefined) formData.append("bio", bio);
  if (icon) formData.append("icon", icon);

  try {
    const response = await api.patch("/users/me", formData);
    if (response.status === 200) {
      console.log("UPDATED!!!");
      revalidatePath("/profile", "layout");
      return { success: true, message: "updated", data: response.data };
    }
  } catch (error) {
    return { success: false, error: catchErrorHandler(error) };
  }
}
