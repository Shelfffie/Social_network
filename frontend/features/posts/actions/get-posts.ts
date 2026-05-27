"use server";
import api from "@/lib/axios";
import { cookies } from "next/headers";
import { catchErrorHandler } from "../../utils/types/catch-error-handler";

export interface FetchPostsProps {
  page?: number;
  search?: string;
  userId?: string;
}

export const fetchPostData = async ({
  page = 1,
  search = "",
  userId,
}: FetchPostsProps) => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  //ПРИБРАТИ У МАЙБУТНЬОМУ
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const response = await api.get("/posts", {
      headers: {
        Cookie: allCookies,
      },
      params: { page, search, byUser: userId },
    });
    if (response.status === 200) {
      const posts = response.data;
      console.log(posts);
      return posts;
    }
  } catch (error) {
    catchErrorHandler(error);
  }
};

export const getSinglePost = async (postId: string) => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const response = await api.get(`/posts/${postId}`, {
      headers: {
        Cookie: allCookies,
      },
    });
    if (response.status === 200) {
      const post = response.data;
      console.log(post);
      return post;
    }
  } catch (error) {
    catchErrorHandler(error);
  }
};
