"use client";
import { X } from "lucide-react";

import React, { useEffect, useRef } from "react";
import ScrollToTopButton from "./scroll-to-top-button";
import { useRouter } from "next/navigation";

export function Modal({
  children,
  isPost = false,
  onClose,
}: {
  children: React.ReactNode;
  isPost?: boolean;
  onClose?: () => void;
}) {
  const modalWindowRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center fixed inset-0 z-[999] bg-black/50"
        onClick={handleBackgroundClick}
      >
        <div
          className={`relative max-h-[93vh] max-w-3xl border-2 rounded-xl shadow-1 bg-indigo-50 overflow-y-auto overflow-x-hidden @container ${
            isPost ? `w-full` : `min-w-90`
          }`}
          ref={modalWindowRef}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute z-1000 top-4 right-4 hover:text-indigo-600 active:scale-110 transition-all"
            onClick={() => handleClose()}
          >
            <X />
          </button>

          {children}
        </div>
        <ScrollToTopButton scrollRef={modalWindowRef} />
      </div>
    </>
  );
}
