import Image from "next/image";
import AvatarIcon from "../avatar-icon";

export default function PostComponent({
  avatarIcon,
  showedName,
  username,
  content,
  images,
}: {
  avatarIcon?: string;
  showedName?: string;
  username?: string;
  content?: string;
  images?: string[];
}) {
  return (
    <main className="flex flex-col g-100">
      <div className="flex flex-row">
        <AvatarIcon />
        <div>
          <h3>{showedName ?? "Showed name"}</h3>
          <p>{username ?? "username"}</p>
        </div>
        <div>{content ?? "content"}</div>
        <div className="grid grid-rows">
          {images?.map((imgSrc) => (
            <img src={imgSrc} />
          ))}
        </div>
      </div>
    </main>
  );
}
