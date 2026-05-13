"use server";
import api from "@/lib/axios";
import { cookies } from "next/headers";
import { catchErrorHandler } from "../utils/types/catch-error-handler";

export async function fetchPostData() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const response = await api.get("/posts", {
      headers: {
        Cookie: allCookies,
      },
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
