import { Modal } from "@/features/common/components/modal";
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
    <Modal isPost={true}>
      <div className="w-full @container">
        <PostPageClientWrapper post={post} />
        <div className="flex justify-center">
          <h1>COMMENTS IN DEVELOPMENT...</h1>
        </div>
      </div>
    </Modal>
  );
}
