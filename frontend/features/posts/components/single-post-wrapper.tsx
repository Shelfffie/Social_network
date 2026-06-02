"use client";

import { useAuth } from "@/features/auth/contexts/auth-context";
import { PostType } from "@/features/utils/types/posts/post-type";
import PostComponent from "./post-component";
import { PostsProvider } from "../context/post-context";

export default function PostPageClientWrapper({ post }: { post: PostType }) {
  const auth = useAuth();

  return (
    <PostsProvider query={{ page: 1, userId: undefined }}>
      <PostComponent post={post} auth={auth} />
    </PostsProvider>
  );
}
