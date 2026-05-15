import { PostType } from "@/features/utils/types/posts/post-type";
import PostsSkeleton from "./posts-skeleton";
import PostComponent from "./post";

interface PostListProps {
  posts: PostType[];
  loading: boolean;
  emptyMessage?: string;
}

export default function PostList({
  posts,
  loading,
  emptyMessage = "That's all for now",
}: PostListProps) {
  if (loading) return <PostsSkeleton />;

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-15 text-indigo-600 ">
        <h3>{emptyMessage}</h3>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {posts?.map((post) => (
        <PostComponent key={post._id} post={post} />
      ))}
    </div>
  );
}
