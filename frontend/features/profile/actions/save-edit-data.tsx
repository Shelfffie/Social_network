import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import { EditInputValuesType } from "../utils/edit-types";
import api from "@/lib/axios";
import { EditProfileSchema } from "../schemas/edit-profile-schema";

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
    const response = await api.patch("/user", formData);
    if (response.status === 200) {
      console.log("UPDATED!!!");
      return { success: true, message: "updated" };
    }
  } catch (error) {
    return { success: false, error: catchErrorHandler(error) };
  }
}
