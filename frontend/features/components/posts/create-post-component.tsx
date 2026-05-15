import { Image } from "lucide-react";
import { InputBasic } from "../input";

export default function CreatePostComponent() {
  return (
    <div className="flex flex-col w-full gap-5 justify-end w-200 items-center">
      <InputBasic
        styles="bg-indigo-50 shadow border-indigo-600 w-11/12"
        placeholder="Say hello..."
      />
      <div className="flex flex-row justify-between w-180 ">
        <Image className="text-indigo-600 active:scale-110 transition-all" />
        <button className="button-c bg-indigo-50 w-15 rounded-md hover::bg-indigo-100">
          Post
        </button>
      </div>
    </div>
  );
}
