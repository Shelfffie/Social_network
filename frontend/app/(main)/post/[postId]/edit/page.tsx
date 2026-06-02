import { getSinglePost } from "@/features/posts/actions/get-posts";
import EditPost from "@/features/posts/components/edit-post";
import { PostsProvider } from "@/features/posts/context/post-context";

export default async function EditPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;
  const post = await getSinglePost(postId);

  return (
    <PostsProvider query={{ page: 1, userId: undefined }}>
      <EditPost post={post} />;
    </PostsProvider>
  );
}
