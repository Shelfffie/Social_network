import defaultPhoto from "../../public/default-avatar.jpg";
import Image from "next/image";

export default function AvatarIcon({
  img,
  sizes = "4",
}: {
  img?: string | null;
  sizes?: string;
}) {
  const imageSrc = img ?? defaultPhoto;
  return (
    <Image
      src={imageSrc}
      alt="avatar"
      className="rounded-full"
      style={{ height: `${sizes}rem`, width: `${sizes}rem` }}
    />
  );
}
