"use client";
import defaultPhoto from "../../../public/default-avatar.jpg";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

export default function AvatarIcon({
  img,
  sizes = "4",
}: {
  img?: File | string | null;
  sizes?: string;
}) {
  let src: string | StaticImageData = defaultPhoto;
  if (img instanceof File) {
    src = URL.createObjectURL(img);
  } else if (typeof img === "string" && img.length > 0) {
    src = img.startsWith("http") ? img : getImageUrl(img);
  }

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
