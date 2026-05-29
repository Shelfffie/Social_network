"use client";

import useDebounse from "@/features/common/hooks/use-debounce";
import { PostType } from "@/features/utils/types/posts/post-type";
import { Heart } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { fetchLike } from "../actions/likeUnlike";
import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";

interface LikesType {
  _id: string;
  likesCount: number;
  isLiked: boolean;
}

export default function LikeButtonToggle({
  item,
  targetType,
  auth,
}: {
  item: LikesType;
  targetType: "post" | "comment";
  auth?: any | null;
}) {
  console.log("ITEM:", item);

  const initialIsLiked = useRef(item?.isLiked || false);
  const [likes, setLikes] = useState({
    likesCount: item?.likesCount ?? 0,
    isLiked: item?.isLiked || false,
  });
  const debouncedValue = useDebounse(likes.isLiked, 1000);

  useEffect(() => {
    const like = async () => {
      if (debouncedValue === initialIsLiked.current) return;
      try {
        const newIsLiked = await fetchLike(item._id, targetType);
        console.log("NEW ISLIKED", newIsLiked);

        initialIsLiked.current = newIsLiked;
      } catch (error) {
        catchErrorHandler(error);
        setLikes((prev) => ({ ...prev, isLiked: initialIsLiked.current }));
      }
    };
    like();
  }, [debouncedValue]);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!auth?.isLoggedIn) return;

    setLikes((prev) => ({
      isLiked: !prev.isLiked,
      likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
    }));
  };

  return (
    <div className="flex flex-row gap-2">
      <Heart
        size={18}
        className={`text-indigo-600 transition-all ${
          !auth?.isLoggedIn
            ? "cursor-not-allowed pointer-events-none"
            : "active:scale-110 cursor-pointer"
        }`}
        fill={likes.isLiked ? "#4F46E5" : "none"}
        onClick={(e) => handleLikeToggle(e)}
      />
      <p className="text-indigo-600">{likes.likesCount}</p>
    </div>
  );
}
