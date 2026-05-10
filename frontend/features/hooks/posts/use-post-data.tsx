import axios from "axios";
import { useEffect, useState } from "react";

export default function usePostsData({ query }: { query: string }) {
  const [posts, setPosts] = useState<any>({});

  useEffect(() => {
    const getPosts = async () => {};
  }, [query]);
}
