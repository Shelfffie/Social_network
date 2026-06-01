"use client";

import { PostType } from "@/features/utils/types/posts/post-type";
import ProfileComponent from "./profile-component";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserType } from "@/features/utils/types/user";
import PostsContainer from "@/features/posts/components/posts-container";

export default function ProfileView({
  posts,
  loading,
  isMyProfile,
  user,
}: {
  posts: PostType[];
  loading: boolean;
  isMyProfile: boolean;
  user: UserType;
}) {
  const [isActive, setIsActive] = useState<string>("posts");
  const basicBtnStyles =
    "relative text-xl transtion-all duration-300 ease-in-out hover:text-indigo-600 hover:-translate-y-1 after:absolute after:w-0 after:h-0 after:left-1/2  after:bottom-0 after:rounded-full after:transtion-all after:duration-300 after:ease-in-out after:-translate-x-1/2";
  const activeBtn =
    "text-indigo-600 -translate-y-1 after:bottom-[-15] after:h-1.5 after:w-20 after:bg-indigo-600";

  return (
    <div className="flex flex-col w-full">
      <ProfileComponent user={user} isMyProfile={isMyProfile} />
      <nav className="flex flex-row justify-between items-center h-15 bg-indigo-50 pl-10 pr-10 border-t-1 border-b-1 border-indigo-300">
        <Button
          variant="ghost"
          onClick={() => setIsActive("posts")}
          className={`${basicBtnStyles} ${isActive === "posts" && activeBtn}`}
        >
          Posts
        </Button>
        {isMyProfile && (
          <>
            <Button
              variant="ghost"
              className={`${basicBtnStyles} ${
                isActive === "comments" && activeBtn
              }`}
              onClick={() => setIsActive("comments")}
            >
              Comments
            </Button>
            <Button
              variant="ghost"
              className={`${basicBtnStyles} ${
                isActive === "likes" && activeBtn
              }`}
              onClick={() => setIsActive("likes")}
            >
              Likes
            </Button>
          </>
        )}
      </nav>
      {isActive === "posts" && (
        <PostsContainer showCreateForm={isMyProfile} userId={user._id} />
      )}
    </div>
  );
}
