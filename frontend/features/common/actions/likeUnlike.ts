"use server";
import api from "@/lib/axios";
import { cookies } from "next/headers";
import { catchErrorHandler } from "../../utils/types/catch-error-handler";

export async function fetchLike(id: string, targetType: string) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const url =
    targetType === "post" ? `/posts/${id}/like` : `/comments/${id}/like`;

  try {
    const response = await api.patch(
      url,
      {},
      {
        headers: {
          Cookie: allCookies,
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      const isLiked = response.data.isLiked;
      console.log(isLiked);
      return isLiked;
    }
  } catch (error) {
    catchErrorHandler(error);
  }
}
