"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { PostType } from "@/features/utils/types/posts/post-type";
import usePostsData from "../hooks/use-post-data";

interface PostsContextType {
  posts: PostType[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  addPost: (post: PostType) => void;
  removePost: (postId: string) => void;
  updatePost: (updatedPost: PostType) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

interface PostsProviderProps {
  children: ReactNode;
  query: { page: number; userId?: string };
}

export const PostsProvider = ({ children, query }: PostsProviderProps) => {
  const { posts, setPosts, loading, loadMore, hasMore } = usePostsData(query);

  const addPost = (post: PostType) => {
    setPosts((prev) => [post, ...prev]);
  };
  const removePost = (postId: string) =>
    setPosts((prev) => prev.filter((p) => p._id !== postId));

  const updatePost = (updatedPost: PostType) => {
    setPosts((prev) =>
      prev.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        removePost,
        updatePost,
        loading,
        loadMore,
        hasMore,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error("Posts error");
  return context;
};
