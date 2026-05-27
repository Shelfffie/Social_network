"use client";

import { useAuth } from "@/features/auth/contexts/auth-context";
import { PostType } from "@/features/utils/types/posts/post-type";
import PostComponent from "./post-component";

export default function PostPageClientWrapper({ post }: { post: PostType }) {
  const auth = useAuth();

  return <PostComponent post={post} auth={auth} />;
}
