import { getSinglePost } from "@/features/posts/actions/get-posts";
import PostPageClientWrapper from "@/features/posts/components/single-post-wrapper";

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const postId = (await params).postId;
  const post = await getSinglePost(postId);

  return (
    <div className="w-full @container">
      <PostPageClientWrapper post={post} />
      <div></div>
    </div>
  );
}
