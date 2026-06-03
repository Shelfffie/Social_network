import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";

import Alert from "@/features/common/components/modal-and-alert/alert";
import { FetchDeleteComment } from "../actions/delete-comment";
import { useComments } from "../contexts/comment-context";

import { CommentType } from "../utils/types";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { UserType } from "@/features/utils/types/user";

export default function CommentDropDownMenu({
  comment,
  user,
  onEdit,
}: {
  comment: CommentType;
  user: UserType;
  onEdit: () => void;
}) {
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { removeComment } = useComments();

  useEffect(() => {
    if (!user || !comment.creatorId || !comment.creatorId._id) return;

    if (comment.creatorId._id.toString() === user._id.toString()) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, [user, comment]);

  const handleDeleteComment = async (commentId: string) => {
    if (!isAuthor) return;
    try {
      const result = await FetchDeleteComment(commentId);
      if (result?.success) {
        setIsModalOpen(false);
        setTimeout(() => {
          removeComment(commentId);
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
                <DropdownMenuItem onClick={onEdit}>
                  Редагувати коментар
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                  Видалити коментар
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
            onConfirm={() => {
              handleDeleteComment(comment._id);
            }}
            modalText={{
              title: "Are you sure you want to delete this comment?",
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
