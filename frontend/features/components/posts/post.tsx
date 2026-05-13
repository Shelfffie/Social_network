import { Heart, MessageCircle } from "lucide-react";
import AvatarIcon from "../avatar-icon";
import { PostType } from "@/features/utils/types/posts/post-type";

export default function PostComponent({ post }: { post?: PostType }) {
  return (
    <main className="flex flex-col gap-5 p-5 max-w-1000 border-b-1 h-auto min-h-30 border-indigo-300 pl-5">
      <div className="flex flex-row gap-5">
        <AvatarIcon img={post?.creatorId?.iconURL} />
        <div className="">
          <h3>{post?.creatorId?.displayName ?? "Showed name"}</h3>
          <p className="text-indigo-600">
            {post?.creatorId?.username ?? "username"}
          </p>
        </div>
      </div>

      <div className="pl-2">
        {post?.content ??
          "Текст (від лат. textus — «тканина», «з'єднання», «побудова») — це зв'язна та послідовна сукупність знаків, що утворює певне повідомлення, висловлювання або документ"}
      </div>
      <div className="grid grid-rows">
        {post?.images && post?.images?.map((imgSrc) => <img src={imgSrc} />)}
      </div>
      <div className="flex flex-row justify-between pr-15 pl-15">
        <div className="flex flex-row gap-2">
          <MessageCircle className="text-indigo-600 active:scale-110 transition-all" />
          <p className="text-indigo-600">{post?.commentsCount ?? 0}</p>
        </div>
        <div className="flex flex-row gap-2">
          <Heart
            className="text-indigo-600 active:scale-110 transition-all"
            fill="#4F46E5"
          />
          <p className="text-indigo-600">{post?.likes?.length ?? 0}</p>
        </div>
      </div>
    </main>
  );
}
