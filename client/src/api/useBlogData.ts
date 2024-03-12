import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export interface BlogsProps {
  _id?: string;
  title: string;
  photoUrl: string;
  category: string;
  authorName: string;
  authorImg: string;
  published: string;
  content?: string;
}

export interface BlogData {
  data: BlogsProps[];
  isLoading: boolean;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<BlogsProps[], unknown>>;
}

const useBlogData = (): BlogData => {
  const axiosPublic = useAxiosPublic();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery<BlogsProps[], unknown>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data.data;
    },
  });

  return { data, isLoading, refetch };
};

export default useBlogData;
