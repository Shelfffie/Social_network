"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { Modal } from "@/features/common/components/modal";
import WhiteButton from "@/features/common/components/white-indigo-button";
import { PostType } from "@/features/utils/types/posts/post-type";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FetchDeletePost } from "../actions/delete-post";

export default function PostDropDownDetails({ post }: { post: PostType }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthour, setIsAuthour] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("POST CREATOR");
    if (!user || !post.creatorId || !post.creatorId._id) return;

    if (post.creatorId._id.toString() === user._id.toString()) {
      setIsAuthour(true);
    } else {
      setIsAuthour(false);
    }
  }, [user, post]);

  const handleDeletePost = async (postId: string) => {
    try {
      const result = await FetchDeletePost(postId);
      if (result?.success) {
        return true;
      } else {
        console.log(result?.message);
        return false;
      }
    } catch (error) {
      return false;
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 z-[99999]"
          align="start"
          onClick={(e) => e.stopPropagation()}
        >
          {isAuthour ? (
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => router.push(`/post/${post._id}/edit`)}
                >
                  Редагувати пост
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                  Видалити пост
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          ) : (
            <DropdownMenuGroup>
              <DropdownMenuItem>Додати користувача в друзі</DropdownMenuItem>
              <DropdownMenuItem>Перейти в профіль користувача</DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col items-center justify-center gap-7 h-50 w-full overflow-hidden">
            <h1 className="text-lg">
              Are you sure you want to delete this post?
            </h1>
            <p>This action cannot be undone</p>
            <div className="flex flex-row gap-10">
              <WhiteButton
                text="Cancel"
                onClick={() => setIsModalOpen(false)}
              />
              <Button
                variant="destructive"
                onClick={() => handleDeletePost(post._id)}
                className="w-30"
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
