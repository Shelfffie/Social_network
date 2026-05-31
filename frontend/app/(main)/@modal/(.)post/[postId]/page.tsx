import { getCommentsByPost } from "@/features/comments/actions/get-comments";
import CommentsContainer from "@/features/comments/components/comments-container";
import CommentsList from "@/features/comments/components/comments-list";
import CreateCommentComponent from "@/features/comments/components/create-comment";
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
  const comments: CommentType[] = await getCommentsByPost(postId, 1);

  return (
    <Modal isPost={true}>
      <div className="w-full @container">
        <PostPageClientWrapper post={post} />
        <div className="flex flex-col w-full justify-center">
          <CommentsContainer
            initialComments={comments}
            postId={postId}
            createCommStyle="w-full m-auto p-5 border-b-1 bg-indigo-50 border-indigo-300"
            commListStyle=""
          />
        </div>
      </div>
    </Modal>
  );
}
