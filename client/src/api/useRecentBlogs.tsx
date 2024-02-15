

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';

const useRecentBlogs = () => {

    const axiosPublic = useAxiosPublic();

    const { data = [], isLoading } = useQuery({
      queryKey: ["recentBlogs"],
      queryFn: async () => {
        const res = await axiosPublic.get("/blogs/recent");
        return res.data.data;
      },
    });
  
    return {data,isLoading}
};

export default useRecentBlogs;