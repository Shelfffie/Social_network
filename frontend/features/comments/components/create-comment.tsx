"use client";
import { InputBasic } from "@/features/common/components/input";
import WhiteButton from "@/features/common/components/white-indigo-button";
import React, { useState } from "react";
import { createComment } from "../actions/create-comments";
import { useCommentAction } from "../contexts/comment-context";

export default function CreateCommentComponent({
  postId,
  parentId,
}: {
  postId: string;
  parentId?: string;
}) {
  const addComment = useCommentAction();
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitToggle = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createComment(postId, inputValue, parentId);
      if (result?.success) {
        if (addComment) addComment(result.data);
        setInputValue("");
        console.log("NEW COMMENT:", result.data);

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
    <form className="" onSubmit={(e) => submitToggle(e)}>
      <InputBasic
        placeholder="Reply"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <div className="flex justify-end pt-3">
        <WhiteButton text="Send" type="submit" />
      </div>
    </form>
  );
}
