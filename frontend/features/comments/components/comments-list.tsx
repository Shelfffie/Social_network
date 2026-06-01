"use client";
import { useAuth } from "@/features/auth/contexts/auth-context";
import Comment from "./single-comment";
import useIntersectionObserver from "@/features/common/hooks/use-intersiction-observer";
import { useEffect } from "react";
import { buildCommentTree } from "../utils/build-comments-tree";
import { CommentType, CommentWithReplies } from "../utils/types";

export default function CommentsList({
  comments,
  loadMore,
  hasMore,
  loading,
}: {
  comments: CommentType[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}) {
  const auth = useAuth();
  const { targetRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const commentTree = buildCommentTree(comments);

  useEffect(() => {
    if (isVisible && hasMore && !loading) loadMore();
  }, [isVisible, hasMore, loading, loadMore]);
  return (
    <div className="flex flex-col justify-center items-center">
      {commentTree.length === 0 ? (
        <p className="p-5">No comments yet</p>
      ) : (
        commentTree.map((comment) => (
          <div key={comment._id} className="w-full">
            <CommentTreeDisplay
              key={comment._id}
              comment={comment}
              auth={auth}
            />
          </div>
        ))
      )}
      <div ref={targetRef} className="h-10">
        {loading && <p>Loading more...</p>}
      </div>
    </div>
  );
}

function CommentTreeDisplay({
  comment,
  auth,
}: {
  comment: CommentWithReplies;
  auth: any;
}) {
  return (
    <div className="w-full flex flex-col pl-2 border-l-1 border-indigo-100">
      <Comment comment={comment} auth={auth} />

      {comment.replies.length > 0 && (
        <div className="flex flex-col">
          {comment.replies.map((reply) => (
            <CommentTreeDisplay key={reply._id} comment={reply} auth={auth} />
          ))}
        </div>
      )}
    </div>
  );
}
