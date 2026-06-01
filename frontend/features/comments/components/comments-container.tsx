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
  const { comments, setComments, loadMore, loading, hasMore } =
    useCommentsData(postId);

  const handleNewComment = (newComment: CommentType) => {
    console.log("COMMENT NEW HANDLE");

    setComments((prev) => {
      const next = [newComment, ...prev];
      console.log("Новий стан масиву коментарів:", next);
      return next;
    });
  };

  return (
    <CommentProvider value={handleNewComment}>
      <div className={createCommStyle}>
        <CreateCommentComponent postId={postId} />
      </div>
      <div className={commListStyle}>
        <CommentsList
          comments={comments}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />
      </div>
    </CommentProvider>
  );
}
