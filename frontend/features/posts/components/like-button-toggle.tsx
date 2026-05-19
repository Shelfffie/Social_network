"use client";

import useDebounse from "@/features/common/hooks/use-debounce";
import { PostType } from "@/features/utils/types/posts/post-type";
import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fetchLike } from "../actions/likeUnlike";
import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";

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
  console.log(auth);

  const initialIsLiked = useRef(post?.isLiked || false);
  const [likes, setLikes] = useState<postLikesType>({
    likesCount: post?.likesCount ?? 0,
    isLiked: post?.isLiked || false,
  });
  const debouncedValue = useDebounse(likes.isLiked, 1000);

  useEffect(() => {
    const like = async () => {
      if (debouncedValue === initialIsLiked.current) return;
      try {
        const newIsLiked = await fetchLike(post!._id);
        console.log("NEW ISLIKED", newIsLiked);

        initialIsLiked.current = newIsLiked;
      } catch (error) {
        catchErrorHandler(error);
        setLikes((prev) => ({ ...prev, isLiked: initialIsLiked.current }));
      }
    };
    like();
  }, [debouncedValue]);

  const handleLikeToggle = async () => {
    if (!auth?.isLoggedIn) return;

    setLikes((prev) => ({
      isLiked: !prev.isLiked,
      likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
    }));
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
