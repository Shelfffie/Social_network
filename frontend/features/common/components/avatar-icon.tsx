"use client";
import defaultPhoto from "../../../public/default-avatar.jpg";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import useImagePreview from "../hooks/use-image-preview";

export default function AvatarIcon({
  img,
  sizes = "4",
}: {
  img?: File | string | null;
  sizes?: string;
}) {
  const src = useImagePreview(img) ?? defaultPhoto;

  console.log("Спроба завантаження URL:", src);
  return (
    <Image
      width={200}
      height={200}
      src={src}
      alt="avatar"
      className="rounded-full h-auto w-full min-w-15 aspect-square object-cover object-center"
      style={{ maxWidth: `${sizes}rem` }}
      unoptimized={true}
      crossOrigin="anonymous"
    />
  );
}
