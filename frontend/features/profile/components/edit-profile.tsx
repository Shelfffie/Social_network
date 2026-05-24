"use client";

import AvatarIcon from "../../common/components/avatar-icon";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InputBasic } from "@/features/common/components/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/contexts/auth-context";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EditInputValuesType } from "../utils/edit-types";
import { SaveEditDataFunction } from "../actions/save-edit-data";
import { getChangedFields } from "../utils/get-changes-fields";

export default function EditProfileFormComponent() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [inputValues, setInputValues] = useState<EditInputValuesType>({
    icon: null,
    displayName: user.displayName,
    username: user.username,
    bio: user.bio,
  });

  //ВИКОРИСТАТИ СТЕЙТИ НА МАБЙБУТНЄ
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        setInputValues((prev) => ({ ...prev, [name]: fileInput.files![0] }));
      }
    } else {
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const changesValues = getChangedFields(inputValues, user);

    if (Object.keys(changesValues).length === 0) {
      console.log("No changes");
      router.back();
      return;
    }

    try {
      const result = await SaveEditDataFunction(changesValues);
      if (result?.success) {
        console.log(result.data);

        setUser(result.data);
        router.back();
      } else {
        setError(result?.message || "Щось пішло не так");
      }
    } catch (error) {
      console.error(error);
      setError("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className=" flex flex-row items-center h-screen w-full bg-indigo-50 pb-20 pr-40 @max-[400px]:flex-col @max-[400px]:max-h-145 @max-[400px]:p-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center items-center relative w-full  ">
        <AvatarIcon sizes={"12"} img={inputValues.icon} />
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-[-10px]"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          name="icon"
          onChange={(e) => inputHandler(e)}
        />
      </div>

      <div className="max-w-500">
        <div className="flex flex-col w-100 @max-[400px]:w-80 gap-1 justify-center items-center pt-5 ">
          <p>Name</p>
          <InputBasic
            placeholder="Display name"
            name="displayName"
            value={inputValues.displayName}
            onChange={(e) => inputHandler(e)}
          />
          <p>Username</p>
          <InputBasic
            placeholder="@username"
            name="username"
            value={inputValues.username}
            onChange={(e) => inputHandler(e)}
          />
          <p>Bio</p>
          <Textarea
            placeholder="Bio"
            className="h-20 bg-white"
            name="bio"
            value={inputValues.bio}
            onChange={(e) => inputHandler(e)}
          />
        </div>
        <div className="flex flew-row  w-full justify-between pt-4 max-w-250">
          <Button
            className="w-30 h-10 bg-gray-400 transition-all hover:bg-gray-600"
            onClick={() => router.back()}
            type="button"
          >
            Cancel
          </Button>
          <Button
            className="w-30 h-10 bg-indigo-300 transition-all hover:bg-indigo-600"
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
