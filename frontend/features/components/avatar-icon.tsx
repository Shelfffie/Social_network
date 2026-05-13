import defaultPhoto from "../../public/default-avatar.jpg";
import Image from "next/image";

export default function AvatarIcon({ img }: { img?: string | null }) {
  const imageSrc = img ?? defaultPhoto;
  return (
    <Image src={imageSrc} alt="avatar" className="w-15 h-15 rounded-full" />
  );
}
