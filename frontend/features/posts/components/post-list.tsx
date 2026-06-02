import { PostType } from "@/features/utils/types/posts/post-type";
import PostsSkeleton from "./posts-skeleton";
import PostComponent from "./post-component";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import useIntersectionObserver from "@/features/common/hooks/use-intersiction-observer";
import { usePosts } from "../context/post-context";

export default function PostList({
  emptyMessage = "That's all for now",
}: {
  emptyMessage?: string;
}) {
  const { posts, loading, loadMore, hasMore } = usePosts();
  const auth = useAuth();
  const router = useRouter();
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    if (isVisible && hasMore && !loading) {
      loadMore();
    }
  }, [isVisible, hasMore, loading, loadMore]);

  return (
    <div className="flex flex-col">
      {posts?.map((post) => (
        <div
          key={post._id}
          onClick={() => router.push(`/post/${post._id}`)}
          className="cursor-pointer transition-all duration-300 hover:bg-indigo-50"
        >
          <PostComponent key={post._id} post={post} auth={auth} />
        </div>
      ))}
      <div ref={targetRef} className="h-10">
        {(hasMore || loading) && <PostsSkeleton />}
      </div>
    </div>
  );
}
