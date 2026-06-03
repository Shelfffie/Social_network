import { MessageCircle } from "lucide-react";
import AvatarIcon from "../../common/components/avatar-icon";
import { PostType } from "@/features/utils/types/posts/post-type";
import LikeButtonToggle from "../../common/likes/like-button-toggle";
import { getImageUrl } from "@/lib/utils";
import ImagesComponent from "./images-components";
import PostDropDownDetails from "./drop-down-menu-post";

export default function PostComponent({
  post,
  auth,
}: {
  post?: PostType;
  auth?: any | null; //temporary. DON'T FORGET TO CHANGE
}) {
  if (!post) return null;

  return (
    <main className="relative flex flex-col gap-5 p-5 w-full border-b-1 h-auto min-h-30 border-indigo-300 pl-5 @min-[950px]:pt-10">
      <div className="absolute w-15 right-0 ">
        <PostDropDownDetails post={post} user={auth.user} />
      </div>
      <div className="flex flex-row gap-5">
        <AvatarIcon img={post?.creatorId?.iconURL} />
        <div className="">
          <h3>{post?.creatorId?.displayName ?? "Showed name"}</h3>
          <p className="text-indigo-600">
            @{post?.creatorId?.username ?? "username"}
          </p>
        </div>
      </div>

      <div className="pl-2 break-all">{post?.content}</div>
      <div>
        {post?.imageURLs && post?.imageURLs.length > 0 && (
          <ImagesComponent
            photos={post.imageURLs.map((img) => getImageUrl(img))}
          />
        )}
      </div>
      <div className="flex flex-row justify-between pr-15 pl-15">
        <div className="flex flex-row gap-2">
          <MessageCircle
            size={18}
            className="text-indigo-600 active:scale-110 transition-all"
          />
          <p className="text-indigo-600">{post?.commentsCount ?? 0}</p>
        </div>
        <LikeButtonToggle item={post} targetType="post" auth={auth} />
      </div>
    </main>
  );
}
