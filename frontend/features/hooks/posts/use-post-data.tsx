import { catchErrorHandler } from "@/features/utils/types/catch-error-handler";
import api from "@/lib/axios";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";

export default function usePostsData({ query }: { query: string }) {
  const [posts, setPosts] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await api.get("/posts");
        const posts = response.data;
        if (response.status === 200 || 201) {
          setPosts(posts);
        }
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
