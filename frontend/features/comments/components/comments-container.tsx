"use client";

import CreateCommentComponent from "./create-comment";
import CommentsList from "./comments-list";
import useCommentsData from "../hooks/use-comments-data";
import { CommentProvider } from "../contexts/comment-context";
import { CommentType } from "../utils/types";

export default function CommentsContainer({
  postId,
  createCommStyle,
  commListStyle,
}: {
  postId: string;
  createCommStyle: string;
  commListStyle: string;
}) {
  return (
    <CommentProvider postId={postId}>
      <div className={createCommStyle}>
        <CreateCommentComponent postId={postId} />
      </div>
      <div className={commListStyle}>
        <CommentsList />
      </div>
    </CommentProvider>
  );
}
