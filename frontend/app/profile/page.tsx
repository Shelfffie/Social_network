"use client";
import { fetchPostData } from "@/features/actions/get-posts";
import ProfileView from "@/features/components/profiles/profile-view";
import { useAuth } from "@/features/contexts/auth-context";
import usePostsData from "@/features/hooks/posts/use-post-data";

export default function ProfilePage() {
  const query = "";
  const auth = useAuth();

  const { posts, loading } = usePostsData(query);

  return (
    <ProfileView
      user={null}
      posts={posts}
      loading={loading}
      isMyProfile={true}
    />
  );
}
