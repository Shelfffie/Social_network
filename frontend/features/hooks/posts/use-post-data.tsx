"use client";

import { fetchPostData } from "@/features/actions/get-posts";
import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import { PostType } from "@/features/utils/types/posts/post-type";
import { useEffect, useState } from "react";

export default function usePostsData(query: string) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      try {
        const posts = await fetchPostData();
        console.log(posts);
        setPosts(posts.posts);
        setCount(posts.count);
      } catch (error: unknown) {
        catchErrorHandler(error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [query]);

  return { posts, loading };
}
