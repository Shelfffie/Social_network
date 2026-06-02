"use client";

import AvatarIcon from "@/features/common/components/avatar-icon";
import {
  FetchPostsProps,
  PostType,
} from "@/features/utils/types/posts/post-type";
import CreatePostComponent from "./create-post-component";
import PostList from "./post-list";
import usePostsData from "../hooks/use-post-data";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useMemo } from "react";
import { PostsProvider } from "../context/post-context";

export default function PostsContainer({
  showCreateForm = true,
  userId,
}: {
  showCreateForm?: boolean;
  userId?: string | null;
}) {
  const query = useMemo(
    () => ({
      page: 1,
      userId: userId || undefined,
    }),
    [userId]
  );
  const { user } = useAuth();

  return (
    <PostsProvider query={query}>
      <main className="flex-1 w-full">
        <div className="flex flex-row items-start min-h-40 pt-5 pr-5 border-b-1 border-b-indigo-600">
          <div className="w-30 pl-1 pt-10 flex justify-center">
            <AvatarIcon img={user?.iconURL} />
          </div>
          {showCreateForm && <CreatePostComponent />}
        </div>
        <PostList />
      </main>
    </PostsProvider>
  );
}
