"use client";
import { useMemo } from "react";
import defaultPhoto from "../../../public/default-avatar.jpg";
import Image from "next/image";

export default function AvatarIcon({
  img,
  sizes = "4",
}: {
  img?: File | string | null;
  sizes?: string;
}) {
  const imageSrc = useMemo(() => {
    if (img instanceof File) {
      return URL.createObjectURL(img);
    }
    if (typeof img === "string" && img.length > 0) {
      return img;
    }
    return defaultPhoto;
  }, [img]);

  console.log(imageSrc);

  return (
    <Image
      width={100}
      height={100}
      src={imageSrc}
      alt="avatar"
      className="rounded-full h-auto w-full min-w-15 aspect-square object-cover object-center"
      style={{ maxWidth: `${sizes}rem` }}
      unoptimized={img instanceof File}
    />
  );
}
