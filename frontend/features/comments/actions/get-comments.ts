import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import api from "@/lib/axios";
import { cookies } from "next/headers";

export const getCommentsByPost = async (
  postId: string,
  page?: number
): Promise<CommentType[]> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  try {
    const response = await api.get(`/comments/post/${postId}`, {
      headers: {
        Cookie: allCookies,
      },
      params: { page },
    });
    if (response.status === 200) {
      const comments: CommentType[] = response.data.comments;
      console.log(comments);
      return comments;
    }
    return [];
  } catch (error) {
    catchErrorHandler(error);
    return [];
  }
};
