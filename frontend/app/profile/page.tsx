"use client";
import ProfileView from "@/features/components/profiles/profile-view";
import { useAuth } from "@/features/contexts/auth-context";
import usePostsData from "@/features/hooks/posts/use-post-data";

export default function ProfilePage() {
  const query = "";

  const { posts, loading } = usePostsData(query);

  return <ProfileView posts={posts} loading={loading} isMyProfile={true} />;
}
