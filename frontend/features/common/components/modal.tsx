"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

export function Modal({
  children,
  isPost = false,
}: {
  children: React.ReactNode;
  isPost?: boolean;
}) {
  const router = useRouter();
  return (
    <>
      <div className=" flex items-center justify-center fixed inset-0 z-[999] bg-black/50">
        <div
          className={`relative max-h-[93vh] max-w-3xl border-2 rounded-xl shadow-1 bg-indigo-50 overflow-hidden @container ${
            isPost ? `w-full` : `min-w-90`
          }`}
        >
          <button
            className="absolute z-1000 top-4 right-4 hover:text-indigo-600 active:scale-110 transition-all"
            onClick={() => router.back()}
          >
            <X />
          </button>

          {children}
        </div>
      </div>
    </>
  );
}
