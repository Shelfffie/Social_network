"use client";

import { FetchPostsProps } from "@/features/posts/actions/get-posts";
import AvatarIcon from "@/features/common/components/avatar-icon";
import CreatePostComponent from "@/features/posts/components/create-post-component";
import PostList from "@/features/posts/components/post-list";
import usePostsData from "@/features/posts/hooks/use-post-data";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { PostType } from "@/features/utils/types/posts/post-type";
import PostsContainer from "@/features/posts/components/posts-container";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <PostsContainer />
    </div>
  );
}
