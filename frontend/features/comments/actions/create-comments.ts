import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import api from "@/lib/axios";

export const createComment = async (
  postId: string,
  content: string,
  parentId?: string | null
) => {
  console.log("parent id:", parentId);

  try {
    const response = await api.post(`/comments/post/${postId}`, {
      content,
      parentId,
    });
    if (response.status === 200 || response.status === 201) {
      console.log("RESPONSE DATA:", response.data);
      return { success: true, message: "commented", data: response.data };
    }
  } catch (error) {
    return { success: false, error: catchErrorHandler(error) };
  }
};
