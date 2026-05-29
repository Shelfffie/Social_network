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
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          <Comment comment={comment} auth={auth} />
        </div>
      ))}
    </div>
  );
}
