import { Heart, MessageCircle } from "lucide-react";
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
    <main className="flex flex-col gap-5 max-w-1000 border-b-1 h-auto min-h-50 border-indigo-300 pl-5">
      <div className="flex flex-row">
        <AvatarIcon />
        <div>
          <h3>{showedName ?? "Showed name"}</h3>
          <p className="text-indigo-600">{username ?? "username"}</p>
        </div>
      </div>

      <div className="">
        {content ??
          "Текст (від лат. textus — «тканина», «з'єднання», «побудова») — це зв'язна та послідовна сукупність знаків, що утворює певне повідомлення, висловлювання або документ"}
      </div>
      <div className="grid grid-rows">
        {images && images?.map((imgSrc) => <img src={imgSrc} />)}
      </div>
      <div className="flex flex-row justify-between p-5">
        <MessageCircle />
        <Heart
          className="text-indigo-600 active:scale-110 transition-all"
          fill="#4F46E5"
        />
      </div>
    </main>
  );
}
