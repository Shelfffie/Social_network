import { Image } from "lucide-react";
import { InputBasic } from "../../common/components/input";
import React, { useRef, useState } from "react";
import { createPostAction } from "../actions/create-post";

interface CreatePostValues {
  content: string;
  photos: File[] | null;
}

export default function CreatePostComponent() {
  const [inputValue, setInputValue] = useState<CreatePostValues>({
    content: "",
    photos: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    console.log("SUBMIT FIRED");
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createPostAction(inputValue);
      if (result?.success) {
        console.log(result.data);
        return true;
      } else {
        setError(result?.message || "Щось пішло не так");
        console.log(result?.message);

        return false;
      }
    } catch (error) {
      console.error(error);
      setError("Connection error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files) {
      const filesArray = Array.from(e.target.files);
      setInputValue((prev) => ({ ...prev, [e.target.name]: filesArray }));
    } else {
      setInputValue((prev) => ({ ...prev, content: e.target.value }));
    }
  };

  return (
    <form
      className="flex flex-col w-full gap-5 justify-end w-200 items-center"
      onSubmit={(e) => handleSubmit(e)}
    >
      <InputBasic
        styles="bg-indigo-50 shadow border-indigo-600 w-11/12"
        placeholder="Say hello..."
        onChange={(e) => inputHandler(e)}
        value={inputValue.content}
        name="content"
      />
      <div className="flex flex-row justify-between w-180 ">
        <Image
          className="text-indigo-600 active:scale-110 transition-all"
          onClick={() => inputFileRef.current?.click()}
        />
        <input
          type="file"
          className="hidden"
          ref={inputFileRef}
          onChange={(e) => inputHandler(e)}
          name="photos"
        />
        <button
          className="button-c bg-indigo-50 w-15 rounded-md hover::bg-indigo-100"
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
}
