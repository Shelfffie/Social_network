"use client";
import ProfileView from "@/features/profile/components/profile-view";
import usePostsData from "@/features/posts/hooks/use-post-data";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useAuth } from "@/features/auth/contexts/auth-context";

export default function ProfilePage() {
  const auth = useAuth();
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
