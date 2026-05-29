"use client";

import { FetchPostsProps } from "@/features/posts/actions/get-posts";
import AvatarIcon from "@/features/common/components/avatar-icon";
import CreatePostComponent from "@/features/posts/components/create-post-component";
import PostList from "@/features/posts/components/post-list";
import usePostsData from "@/features/posts/hooks/use-post-data";
import { useAuth } from "@/features/auth/contexts/auth-context";

export default function Home() {
  const query: FetchPostsProps = {};
  const { posts, loading } = usePostsData(query);
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 w-full">
        <div className="flex flex-row w-full items-start min-h-40 pt-5 pr-5 border-b-1 border-b-indigo-600">
          <div className="w-30 pl-1 pt-10 flex justify-center">
            <AvatarIcon img={user?.iconURL} />
          </div>
          <CreatePostComponent />
        </div>
        <PostList posts={posts} loading={loading} />
      </main>
    </div>
  );
}
