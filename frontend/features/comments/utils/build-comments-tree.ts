import { CommentType, CommentWithReplies } from "./types";

export const buildCommentTree = (comments: CommentType[]) => {
  const map = new Map<
    string,
    CommentWithReplies & { replies: CommentWithReplies[] }
  >();
  const roots: (CommentWithReplies & { replies: CommentWithReplies[] })[] = [];

  comments.forEach((c) => map.set(c._id, { ...c, replies: [] }));

  map.forEach((comment) => {
    if (comment.parentId) {
      const parent = map.get(comment.parentId);
      if (parent) {
        parent.replies.push(comment);
      } else {
        roots.push(comment);
      }
    } else {
      roots.push(comment);
    }
  });
  return roots;
};
