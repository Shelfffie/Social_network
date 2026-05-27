import { MessageCircle } from "lucide-react";
import AvatarIcon from "../../common/components/avatar-icon";
import { PostType } from "@/features/utils/types/posts/post-type";
import LikeButtonToggle from "./like-button-toggle";
import { getImageUrl } from "@/lib/utils";
import ImagesComponent from "./images-components";

export default function PostComponent({
  post,
  auth,
}: {
  post?: PostType;
  auth?: any | null; //temporary. DON'T FORGET TO CHANGE
}) {
  console.log("POST :", post);
  if (!post) return null;

  if (post?.imageURLs && post?.imageURLs.length > 0) {
    console.log("IMAGE URL: ------", post?.imageURLs);
  }
  return (
    <main className="flex flex-col gap-5 p-5 w-full border-b-1 h-auto min-h-30 border-indigo-300 pl-5 @min-[950px]:pt-10">
      <div className="flex flex-row gap-5">
        <AvatarIcon img={post?.creatorId?.iconURL} />
        <div className="">
          <h3>{post?.creatorId?.displayName ?? "Showed name"}</h3>
          <p className="text-indigo-600">
            {post?.creatorId?.username ?? "username"}
          </p>
        </div>
      </div>

      <div className="pl-2">{post?.content}</div>
      <div>
        {post?.imageURLs && post?.imageURLs.length > 0 && (
          <ImagesComponent
            photos={post.imageURLs.map((img) => getImageUrl(img))}
          />
        )}
      </div>
      <div className="flex flex-row justify-between pr-15 pl-15">
        <div className="flex flex-row gap-2">
          <MessageCircle className="text-indigo-600 active:scale-110 transition-all" />
          <p className="text-indigo-600">{post?.commentsCount ?? 0}</p>
        </div>
        <LikeButtonToggle post={post} auth={auth} />
      </div>
    </main>
  );
}
