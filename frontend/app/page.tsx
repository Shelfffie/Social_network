"use client";

import AvatarIcon from "@/features/components/avatar-icon";
import CreatePostComponent from "@/features/components/posts/create-post-component";
import PostComponent from "@/features/components/posts/post";
import PostsSkeleton from "@/features/components/posts/posts-skeleton";
import usePostsData from "@/features/hooks/posts/use-post-data";

export default function Home() {
  const query = "";
  const { posts, loading } = usePostsData(query);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center h-40 pt-5 border-1 border-b-indigo-600">
        <div className="w-25 flex justify-center">
          <AvatarIcon />
        </div>
        <CreatePostComponent />
      </div>
      {loading ? (
        <PostsSkeleton />
      ) : (
        posts?.map((post) => <PostComponent key={post._id} post={post} />)
      )}
    </div>
  );
}
