import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import api from "@/lib/axios";

export const FetchDeleteComment = async (commentId: string) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    if (response.status === 200) {
      return { success: true, message: "Comment is deleted" };
    }
  } catch (error) {
    return { success: false, error: catchErrorHandler(error) };
  }
};
