"use client";

import { FetchPostsProps } from "@/features/actions/get-posts";
import AvatarIcon from "@/features/components/avatar-icon";
import CreatePostComponent from "@/features/components/posts/create-post-component";
import PostList from "@/features/components/posts/post-list";
import usePostsData from "@/features/hooks/posts/use-post-data";

export default function Home() {
  const query: FetchPostsProps = {};
  const { posts, loading } = usePostsData(query);

  return (
    <div className="flex flex-col w-full items-center">
      <main className="flex-1 w-full">
        <div className="flex flex-row w-full items-center h-40 pt-5 pr-5 border-b-1 border-b-indigo-600">
          <div className="w-30 flex justify-center ">
            <AvatarIcon />
          </div>
          <CreatePostComponent />
        </div>
        <PostList posts={posts} loading={loading} />
      </main>
    </div>
  );
}
