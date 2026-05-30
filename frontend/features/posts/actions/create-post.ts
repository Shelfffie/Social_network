import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import api from "@/lib/axios";
import { PostSchema } from "../schemas/post-schema";
import { CreatePostValues } from "../utils/types";

export const createPostAction = async (data: CreatePostValues) => {
  console.log("INSIDE CREATE POST ACTION");

  const parsed = PostSchema.safeParse(data);
  console.log("PARSED:", parsed.success);
  console.log("PARSED INFO:", parsed);

  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid data",
    };

  console.log("PARSED DATA:", parsed.data);

  const { content, photos } = parsed.data;

  const formData = new FormData();

  formData.append("content", content.content);
  if (content.tags.length !== 0) {
    content.tags.forEach((tag) => {
      formData.append("tags", tag);
    });
  }
  if (photos && photos.length !== 0) {
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });
  }
  console.log("FORM DATA:", formData);
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const response = await api.post("/posts", formData);
    if (response.status === 200) {
      console.log("POSTed!!!");
      return { success: true, message: "posted", data: response.data };
    }
  } catch (error) {
    return { success: false, error: catchErrorHandler(error) };
  }
};
