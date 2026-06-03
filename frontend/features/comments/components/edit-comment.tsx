"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { CommentType } from "../utils/types";
import { editComment } from "../actions/edit-comment";
import { useComments } from "../contexts/comment-context";

interface EditCommentProps {
  comment: CommentType;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function EditCommentComponent({
  comment,
  onCancel,
  onSuccess,
}: EditCommentProps) {
  const [contentValue, setContentValue] = useState<string>(comment.content);
  const [loading, setIsLoading] = useState<boolean>(false);
  const { updateComment } = useComments();

  const onSave = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contentValue.trim() || contentValue === comment.content) {
      onCancel();
      return;
    }
    try {
      setIsLoading(true);
      const result = await editComment(comment._id, contentValue);

      if (result?.success) {
        updateComment(result.data);
        onSuccess();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => onSave(e)}>
      <Textarea
        value={contentValue}
        onChange={(e) => setContentValue(e.target.value)}
        className="bg-white"
      />
      <div className="pt-5 flex flex-row justify-between @container">
        <Button
          variant="secondary"
          type="button"
          className="w-25 h-8 border-1 border-indigo-300"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          className="w-25 h-8 rounded-md text-black bg-indigo-50 hover:bg-indigo-100 transition-all @min-[500px]:bg-white"
          type="submit"
          disabled={loading || !contentValue.trim()}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
