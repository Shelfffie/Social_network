import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import api from "@/lib/axios";
import { CommentType } from "../utils/types";

export const getCommentsByPost = async (
  postId: string,
  page?: number
): Promise<CommentType[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const response = await api.get(`/comments/post/${postId}`, {
      params: { page },
    });
    if (response.status === 200) {
      const comments: CommentType[] = response.data.comments;
      console.log("COMMENT FETCHED:", comments);

      return comments;
    }
    return [];
  } catch (error) {
    catchErrorHandler(error);
    return [];
  }
};
