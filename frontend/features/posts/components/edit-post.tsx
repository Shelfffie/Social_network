"use client";

import { Textarea } from "@/components/ui/textarea";
import AvatarIcon from "@/features/common/components/avatar-icon";
import { PostType } from "@/features/utils/types/posts/post-type";
import { useEffect, useState } from "react";
import ImagesComponent from "./images-components";
import { getImageUrl } from "@/lib/utils";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useRouter } from "next/navigation";
import { FetchEditPost } from "../actions/edit-post";
import { Button } from "@/components/ui/button";

export default function EditPost({ post }: { post: PostType }) {
  const { user } = useAuth();
  const router = useRouter();

  console.log("creatorId:", post.creatorId);
  console.log("userId:", user._id);

  useEffect(() => {
    if (user && post.creatorId._id !== user._id.toString()) {
      router.back();
    }
  }, [post.creatorId, user, router]);

  const [inputValue, setInputValue] = useState<string>(post.content);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && post.creatorId._id !== user._id.toString()) return;
    console.log("SUBMIT FIRED");
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await FetchEditPost(post._id, inputValue);
      if (result?.success) {
        console.log(result.data);
        router.replace(`/post/${post._id}`);
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

  return (
    <form
      className="flex flex-col items-center gap-5 w-full p-10 @container"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="w-full">
        <AvatarIcon img={post?.creatorId?.iconURL} />
        <div className="">
          <h3>{post?.creatorId?.displayName ?? "Showed name"}</h3>
          <p className="text-indigo-600">
            @{post?.creatorId?.username ?? "username"}
          </p>
        </div>
      </div>
      <Textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="max-h-60  @max-[500px]:bg-white"
      />

      <div>
        {post?.imageURLs && post?.imageURLs.length > 0 && (
          <ImagesComponent
            photos={post.imageURLs.map((img) => getImageUrl(img))}
          />
        )}
      </div>

      <Button
        className=" w-25 h-10 rounded-md text-black bg-indigo-50 hover:bg-indigo-100 transition-all  @max-[500px]:bg-white "
        type="submit"
      >
        Save
      </Button>
    </form>
  );
}
