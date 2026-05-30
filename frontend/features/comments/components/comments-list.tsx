"use client";
import { useAuth } from "@/features/auth/contexts/auth-context";
import Comment from "./single-comment";

export default function CommentsList({
  comments,
}: {
  comments: CommentType[];
}) {
  const auth = useAuth();
  return (
    <div className="flex flex-col justify-center items-center">
      {comments.length === 0 ? (
        <p className="p-5">No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="w-full">
            <Comment comment={comment} auth={auth} />
          </div>
        ))
      )}
    </div>
  );
}
