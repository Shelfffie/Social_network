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
    if (response.status === 200) {
      console.log("RESPONSE DATA:", response.data);
      return response.data;
    }
    return [];
  } catch (error) {
    catchErrorHandler(error);
    return [];
  }
};
