"use server";
import api from "@/lib/axios";
import { cookies } from "next/headers";
import { catchErrorHandler } from "../utils/types/catch-error-handler";

export async function fetchPostData(
  page: number = 1,
  search: string = "",
  id?: string
) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const reqUrl = "/posts" + (id ? `/${id}` : "");

  try {
    const response = await api.get(reqUrl, {
      headers: {
        Cookie: allCookies,
      },
      params: { page, search },
    });
    console.log("URL:", reqUrl);
    if (response.status === 200 || response.status === 201) {
      const posts = response.data;
      console.log(posts);
      return posts;
    }
  } catch (error) {
    catchErrorHandler(error);
  }
}
