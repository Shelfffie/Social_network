"use client";

import AvatarIcon from "@/features/common/components/avatar-icon";
import LikeButtonToggle from "@/features/common/likes/like-button-toggle";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import CreateCommentComponent from "./create-comment";
import { CommentType } from "../utils/types";
import CommentDropDownMenu from "./drop-down-menu-comments";
import EditCommentComponent from "./edit-comment";
import { AuthType } from "@/features/auth/utils/types";

export default function Comment({
  comment,
  auth,
}: {
  comment: CommentType;
  auth: AuthType;
}) {
  const [isAnswer, SetIsAnswer] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="relative">
      <div className="absolute right-0 top-2">
        <CommentDropDownMenu
          comment={comment}
          user={auth.user}
          onEdit={() => setIsEditing(true)}
        />
      </div>
      <div className=" border-b-1 border-indigo-300 p-2">
        <div className="flex flex-row gap-5 pb-5">
          <AvatarIcon img={comment.creatorId.iconURL} />
          <div className="flex flex-col">
            <p>{comment.creatorId.displayName}</p>
            <p className="text-indigo-600">@{comment.creatorId.username}</p>
          </div>
        </div>
        {isEditing ? (
          <EditCommentComponent
            comment={comment}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <>
            <p className="break-all">{comment.content}</p>
            <div className="flex flew-row justify-between pt-2">
              <MessageCircle
                size={18}
                className="text-indigo-600 active:scale-110 transition-all"
                onClick={() => SetIsAnswer((prev) => !prev)}
                fill={isAnswer ? "#4F46E5" : "none"}
              />
              <LikeButtonToggle
                item={comment}
                targetType="comment"
                auth={auth}
              />
            </div>
          </>
        )}
      </div>
      <div className="p-2">
        {isAnswer && (
          <CreateCommentComponent
            postId={comment.postId}
            parentId={comment._id}
          />
        )}
      </div>
    </div>
  );
}
