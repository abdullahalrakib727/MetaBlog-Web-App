import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../api/useAxiosSecure";

const useAlllBlogsPage = (category: string) => {
  const axiosSecure = useAxiosSecure();

  const { data: pages = {}, refetch: reload } = useQuery({
    queryKey: ["all-blog-list-page", category],
    queryFn: async () => {
      const response = await axiosSecure.get(
        "/blogs/count?category=" + category
      );
      return response.data.data;
    },
  });

  return { pages, reload };
};

export default useAlllBlogsPage;
