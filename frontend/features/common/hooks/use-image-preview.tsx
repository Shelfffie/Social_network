"use client";

import { getImageUrl } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function useImagePreview(img?: File | string | null) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!img) {
      setPreview(null);
      return;
    }
    let objectURL: string | null;
    if (img instanceof File) {
      objectURL = URL.createObjectURL(img);
      setPreview(objectURL);
    } else if (typeof img === "string" && img.length > 0) {
      setPreview(img.startsWith("http") ? img : getImageUrl(img));
    }

    return () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
    };
  }, [img]);

  if (!preview) return null;

  return preview;
}
