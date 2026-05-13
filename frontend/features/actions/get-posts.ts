"use server";
import api from "@/lib/axios";
import { cookies } from "next/headers";

export async function fetchPostData() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const response = await api.get("/posts", {
    headers: {
      Cookie: allCookies,
    },
  });
  const posts = response.data;
  console.log(posts);
  if (response.status === 200 || response.status === 201) {
    return posts;
  }
}
