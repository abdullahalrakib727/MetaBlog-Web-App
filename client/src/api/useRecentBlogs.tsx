import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { BlogData, BlogsProps } from "./useBlogData";

const useRecentBlogs = (): BlogData => {
  const axiosPublic = useAxiosPublic();

  const { data = [], isLoading } = useQuery<BlogsProps[], unknown>({
    queryKey: ["recentBlogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs/recent");
      return res.data.data;
    },
  });

  return { data, isLoading };
};

export default useRecentBlogs;
