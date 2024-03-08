import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../api/useAxiosSecure";
import { BlogsProps } from "../api/useBlogData";
import useAuth from "./useAuth";


const useBlogByUser = () => {
    const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data = [] as BlogsProps[], isLoading } = useQuery({
    queryKey: ["blogByUser", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?authorId=${user?.uid}`);
      return res.data.data;
    },
  });

  return { data, isLoading };

};

export default useBlogByUser;