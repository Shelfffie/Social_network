"use client";
import { createContext, useContext } from "react";
import { CommentType } from "../utils/types";

const CommentContext = createContext<(newComment: CommentType) => void>(
  () => {}
);

export const CommentProvider = CommentContext.Provider;
export const useCommentAction = () => useContext(CommentContext);
