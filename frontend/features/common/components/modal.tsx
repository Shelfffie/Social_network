import { X } from "lucide-react";
import React from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 z-[999] bg-black/50" />
      <div className="fixed inset-0 z-[1000] flex items-center justify-center">
        <X className="hover:text-indigo-600 active:scale-110" />
        {children}
      </div>
    </>
  );
}
