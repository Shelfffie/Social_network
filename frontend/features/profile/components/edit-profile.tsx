import { UserType } from "@/features/utils/types/user";
import AvatarIcon from "../../common/components/avatar-icon";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { InputBasic } from "@/features/common/components/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditProfileFormComponent({
  user,
}: {
  user: UserType | null;
}) {
  return (
    <div className="border-2 border-indigo-300 rounded-xl min-h-140 w-110 p-7 bg-indigo-50">
      <div className="flex flex flex-col justify-center items-center relative w-full ">
        <AvatarIcon sizes={"10"} />
        <Button variant="outline" size="icon" className="absolute top-36">
          <Plus />
        </Button>
      </div>
      <div className="flex flex-col gap-1 justify-center items-center pt-5">
        <p>Name</p>
        <InputBasic placeholder="Display name" />
        <p>Username</p>
        <InputBasic placeholder="@username" />
        <p>Bio</p>
        <Textarea placeholder="Bio" className="h-20 bg-white" />
      </div>
      <div className="flex flew-row justify-between pt-4">
        <Button className="w-30 h-10 bg-gray-400 transition-all hover:bg-gray-600">
          Cancel
        </Button>
        <Button className="w-30 h-10 bg-indigo-300 transition-all hover:bg-indigo-600">
          Save
        </Button>
      </div>
    </div>
  );
}
