import CommentsContainer from "@/features/comments/components/comments-container";
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
    <div className="flex flex-row w-full  @container">
      <PostPageClientWrapper post={post} />
      <div className="relative flex flex-col min-w-100 max-h-screen border-1 border-indigo-600">
        <CommentsContainer
          postId={postId}
          createCommStyle="fixed z-500 top-1 bg-indigo-50 w-99 h-56 pt-26 pl-5"
          commListStyle="pt-43 max-w-120 overflow-y-auto"
        />
      </div>
    </div>
  );
}
