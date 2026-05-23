import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import { EditInputValuesType } from "../utils/edit-types";
import api from "@/lib/axios";

export async function SaveEditDataFunction(data: EditInputValuesType) {
  const formData = new FormData();

  formData.append("displayName", data.displayName);
  formData.append("username", data.username);
  formData.append("bio", data.bio);
  if (data.icon) {
    formData.append("icon", data.icon);

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
}
