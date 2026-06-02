"use client";
import { createContext, ReactNode, useContext } from "react";
import { CommentType } from "../utils/types";
import useCommentsData from "../hooks/use-comments-data";

interface CommentsContextType {
  comments: CommentType[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  addComment: (Comment: CommentType) => void;
  removeComment: (CommentId: string) => void;
  updateComment: (updatedComment: CommentType) => void;
}

const CommentContext = createContext<CommentsContextType | undefined>(
  undefined
);

interface CommentsProviderProps {
  children: ReactNode;
  postId: string;
}

export const CommentProvider = ({
  children,
  postId,
}: CommentsProviderProps) => {
  const { comments, setComments, loadMore, loading, hasMore } =
    useCommentsData(postId);

  const addComment = (comment: CommentType) => {
    setComments((prev) => [comment, ...prev]);
  };
  const removeComment = (commentId: string) =>
    setComments((prev) => prev.filter((p) => p._id !== commentId));

  const updateComment = (updatedComment: CommentType) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment
      )
    );
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        hasMore,
        loadMore,
        addComment,
        removeComment,
        updateComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error("Comments error");
  return context;
};
