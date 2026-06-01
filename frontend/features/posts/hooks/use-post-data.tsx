"use client";

import {
  fetchPostData,
  FetchPostsProps,
} from "@/features/posts/actions/get-posts";
import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import { PostType } from "@/features/utils/types/posts/post-type";
import { useCallback, useEffect, useState } from "react";

export default function usePostsData(query: FetchPostsProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const loadPosts = async (pageNumber: number, isNew = false) => {
    setLoading(true);
    try {
      const data = await fetchPostData({ ...query, page: pageNumber });
      setPosts((prev) => (isNew ? data.posts : [...prev, ...data.posts]));
      setHasMore(data.posts.length > 0);
      setPage(pageNumber);
    } catch (error) {
      catchErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (!loading && hasMore) {
      await loadPosts(page + 1);
    }
  }, [loading, hasMore, page, loadPosts]);

  useEffect(() => {
    setPage(1);
    loadPosts(1, true);
  }, [query.search, query.userId]);

  return { posts, loading, count, setPosts, loadMore, hasMore };
}
