import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface BlogsProps {
  _id: string;
  title: string;
  photoUrl: string;
  category: string;
  authorName: string;
  authorImg: string;
  published: string;
}

interface BlogData {
  data: BlogsProps[];
  isLoading: boolean;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<BlogsProps[], unknown>>;
}

const useBlogData = (): BlogData => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery<BlogsProps[],unknown>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(
        "https://blog-website-server-theta.vercel.app/blogs"
      );
      console.log(res.data.data);
      return res.data.data;
    },
  });

  return { data, isLoading, refetch };
};

export default useBlogData;

