import { useQuery } from "@tanstack/react-query";

export default function useUserData(id: any) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await fetch("/un/user");
      return res.json();
    },
  });

  return { data, isLoading, error };
}
