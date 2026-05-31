import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import api from "@/lib/axios";
import { PostContentSchema } from "../schemas/post-schema";

export const FetchEditPost = async (postId: string, content: string) => {
  const parsedContent = PostContentSchema.safeParse(content);

  if (!parsedContent.success)
    return {
      success: false,
      error: parsedContent.error.issues[0]?.message || "Invalid data",
    };
  try {
    const response = await api.patch(`/posts/${postId}`, {
      content: parsedContent.data.content,
      tags: parsedContent.data.tags,
    });
    if (response.status === 200) {
      return { success: true, message: "edited", data: response.data };
    }
  } catch (error) {
    return { success: false, error: catchErrorHandler(error) };
  }
};
