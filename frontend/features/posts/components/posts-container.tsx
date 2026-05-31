"use client";

import AvatarIcon from "@/features/common/components/avatar-icon";
import { PostType } from "@/features/utils/types/posts/post-type";
import { UserType } from "@/features/utils/types/user";
import { useEffect, useState } from "react";
import CreatePostComponent from "./create-post-component";
import PostList from "./post-list";

export default function PostsContainer({
  initialPosts,
  user,
  loading,
  showCreateForm = true,
}: {
  initialPosts: PostType[];
  user: UserType;
  loading: boolean;
  showCreateForm?: boolean;
}) {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const handleNewPost = (newPost: PostType) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <main className="flex-1 w-full">
      <div className="flex flex-row items-start min-h-40 pt-5 pr-5 border-b-1 border-b-indigo-600">
        <div className="w-30 pl-1 pt-10 flex justify-center">
          <AvatarIcon img={user?.iconURL} />
        </div>
        <CreatePostComponent onPostCreated={handleNewPost} />
      </div>
      <PostList posts={posts} loading={loading} />
    </main>
  );
}
