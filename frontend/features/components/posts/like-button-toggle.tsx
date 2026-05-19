"use client";

import { PostType } from "@/features/utils/types/posts/post-type";
import { Heart } from "lucide-react";
import { useState } from "react";

type postLikesType = {
  likesCount: number;
  isLiked: boolean;
};

export default function LikeButtonToggle({
  post,
  auth,
}: {
  post?: PostType;
  auth?: any | null;
}) {
  const [likes, setLikes] = useState<postLikesType>({
    likesCount: post?.likesCount ?? 0,
    isLiked: post?.isLiked || false,
  });

  const handleLikeToggle = async () => {
    const previous = { ...likes };

    setLikes((prev) => ({
      isLiked: !prev.isLiked,
      likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
    }));

    /* функція відправки лайку
    if error setLikes(previous) */
  };

  return (
    <div className="flex flex-row gap-2">
      <Heart
        className={`text-indigo-600 transition-all ${
          !auth?.isLoggedIn
            ? "cursor-not-allowed pointer-events-none"
            : "active:scale-110 cursor-pointer"
        }`}
        fill={likes.isLiked ? "#4F46E5" : "none"}
        onClick={() => handleLikeToggle()}
      />
      <p className="text-indigo-600">{likes.likesCount}</p>
    </div>
  );
}
