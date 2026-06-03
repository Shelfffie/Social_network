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
import { Modal } from "@/features/common/components/modal-and-alert/modal";
import WhiteButton from "@/features/common/components/white-indigo-button";
import { PostType } from "@/features/utils/types/posts/post-type";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FetchDeletePost } from "../actions/delete-post";
import { usePosts } from "../context/post-context";
import Alert from "@/features/common/components/modal-and-alert/alert";
import { UserType } from "@/features/utils/types/user";

export default function PostDropDownDetails({
  post,
  user,
}: {
  post: PostType;
  user: UserType;
}) {
  const { removePost } = usePosts();
  const router = useRouter();
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!user || !post.creatorId || !post.creatorId._id) return;

    if (post.creatorId._id.toString() === user._id.toString()) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, [user, post]);

  const handleDeletePost = async (postId: string) => {
    if (!isAuthor) return;
    try {
      const result = await FetchDeletePost(postId);
      if (result?.success) {
        setIsModalOpen(false);
        setTimeout(() => {
          removePost(postId);
        }, 100);
      } else {
        console.log(result?.message);
      }
    } catch (error) {
      console.log("error");
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
          {isAuthor ? (
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
        <div onClick={(e) => e.stopPropagation()}>
          <Alert
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => handleDeletePost(post._id)}
            modalText={{
              title: "Are you sure you want to delete this post?",
              content: "This action cannot be undone",
              cancelButton: "Cancel",
              confirmButton: "Delete",
            }}
          />
        </div>
      )}
    </>
  );
}
