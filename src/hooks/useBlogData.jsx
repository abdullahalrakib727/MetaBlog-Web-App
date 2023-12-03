import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBlogData = () => {
  const {
    data: blogs = [],
    isLoading: isLoaded,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(
        "https://blog-website-server-theta.vercel.app/all"
      );
      return res.data;
    },
  });

  const recentBlogs = blogs.sort(
    (a, b) => new Date(b.published) - new Date(a.published)
  );

  return [blogs, isLoaded, recentBlogs, refetch];
};

export default useBlogData;
