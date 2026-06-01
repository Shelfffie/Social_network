import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import api from "@/lib/axios";

export const FetchDeletePost = async (postId: string) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    if (response.status === 200) {
      return { success: true, message: "Post is deleted" };
    }
  } catch (error) {
    return { success: false, error: catchErrorHandler(error) };
  }
};
