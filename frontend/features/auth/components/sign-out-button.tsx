"use client";
import { Button } from "@/components/ui/button";
import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function SignOutButton() {
  const SignOut = async () => {
    try {
      const response = await api.post("/auth/logout");
      console.log("Response status:", response.status);
      if (response.status === 200) {
        console.log("Logout successfully!");

        window.location.href = "/";
      }
    } catch (error) {
      catchErrorHandler(error);
    }
  };

  return (
    <Button variant="link" className="text-xl p-0" onClick={() => SignOut()}>
      Sign Out
    </Button>
  );
}
