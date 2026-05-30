import { getSinglePost } from "@/features/posts/actions/get-posts";
import EditPost from "@/features/posts/components/edit-post";

export default async function EditPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;
  const post = await getSinglePost(postId);

  return <EditPost post={post} />;
}
