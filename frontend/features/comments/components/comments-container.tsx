"use client";

import { useEffect, useState } from "react";
import CreateCommentComponent from "./create-comment";
import CommentsList from "./comments-list";

export default function CommentsContainer({
  initialComments,
  postId,
  createCommStyle,
  commListStyle,
}: {
  initialComments: CommentType[];
  postId: string;
  createCommStyle: string;
  commListStyle: string;
}) {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleNewComment = (newComment: CommentType) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <>
      <div className={createCommStyle}>
        <CreateCommentComponent
          postId={postId}
          onCommentCreated={handleNewComment}
        />
      </div>
      <div className={commListStyle}>
        <CommentsList comments={comments} />
      </div>
    </>
  );
}
