"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { PostType } from "@/features/utils/types/posts/post-type";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostDropDownDetails({ post }: { post: PostType }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthour, setIsAuthour] = useState<boolean>(false);

  useEffect(() => {
    console.log("POST CREATOR");
    if (post.creatorId._id.toString() === user._id.toString()) {
      setIsAuthour(true);
    } else {
      setIsAuthour(false);
    }
  }, [user, post]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis />
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
              <DropdownMenuItem>Видалити пост</DropdownMenuItem>
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
  );
}
