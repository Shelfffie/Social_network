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
import { useState } from "react";
import { Modal } from "@/features/common/components/modal-and-alert/modal";
import WhiteButton from "@/features/common/components/white-indigo-button";

export default function CommentDropDownMenu() {
  const router = useRouter();
  const [isAuthour, setIsAuthour] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
                <DropdownMenuItem>Редагувати коментар</DropdownMenuItem>
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
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col items-center justify-center gap-7 h-50 w-full overflow-hidden">
            <h1 className="text-lg">
              Are you sure you want to delete this comment?
            </h1>
            <p>This action cannot be undone</p>
            <div className="flex flex-row gap-10">
              <WhiteButton
                text="Cancel"
                onClick={() => setIsModalOpen(false)}
              />
              <Button variant="destructive" onClick={() => {}} className="w-30">
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
