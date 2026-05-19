"use client";
import ProfileView from "@/features/components/profiles/profile-view";
import { useAuth } from "@/features/contexts/auth-context";
import usePostsData from "@/features/hooks/posts/use-post-data";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function ProfilePage() {
  const auth = useAuth();
  const router = useRouter();
  if (!auth.user) {
    return <div>Loading...</div>;
  }

  const query = useMemo(
    () => ({
      userId: auth.user._id,
    }),
    [auth.user._id]
  );

  const { posts, loading } = usePostsData(query);

  return (
    <ProfileView
      posts={posts}
      loading={loading}
      isMyProfile={true}
      auth={auth}
    />
  );
}
