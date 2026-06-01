"use client";

import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import { useCallback, useEffect, useState } from "react";
import { getCommentsByPost } from "../actions/get-comments";
import { CommentType } from "../utils/types";

export default function useCommentsData(postId: string) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const loadComments = async (pageNumber: number, isNew = false) => {
    setLoading(true);
    try {
      const data = await getCommentsByPost(postId, pageNumber);
      setComments((prev) => (isNew ? data : [...prev, ...data]));
      setHasMore(data.length === 20);
      setPage(pageNumber);
    } catch (error) {
      catchErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (!loading && hasMore) {
      await loadComments(page + 1);
    }
  }, [loading, hasMore, page, loadComments]);

  useEffect(() => {
    setPage(1);
    loadComments(1, true);
  }, [postId]);

  return { comments, loading, setComments, loadMore, hasMore };
}
