"use server";

import api from "@/lib/axios";
import { cookies } from "next/headers";

export async function getMe() {
  try {
    const cookieStore = await cookies();
    const response = await api.get("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
}
