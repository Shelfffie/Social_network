"use server";
import api from "@/lib/axios";
import { cookies } from "next/headers";
import { catchErrorHandler } from "../../utils/types/catch-error-handler";

export interface FetchPostsProps {
  page?: number;
  search?: string;
  userId?: string;
}

export async function fetchPostData({
  page = 1,
  search = "",
  userId,
}: FetchPostsProps) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    console.log("SEARCH:", search);

    const response = await api.get("/posts", {
      headers: {
        Cookie: allCookies,
      },
      params: { page, search, byUser: userId },
    });
    if (response.status === 200 || response.status === 201) {
      const posts = response.data;
      console.log(posts);
      return posts;
    }
  } catch (error) {
    catchErrorHandler(error);
  }
}
