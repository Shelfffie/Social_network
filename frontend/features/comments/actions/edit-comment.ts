import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import api from "@/lib/axios";

export const editComment = async (
  commentId: string,
  commentContent: string
) => {
  try {
    const response = await api.patch(`/comments/${commentId}`, {
      content: commentContent,
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    return { success: false, error: catchErrorHandler(error) };
  }
};
