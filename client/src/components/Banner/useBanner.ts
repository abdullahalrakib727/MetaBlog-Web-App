import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../api/useAxiosPublic";

const useBanner = () => {
  const axiosPublic = useAxiosPublic();

  const { data = {}, refetch } = useQuery({
    queryKey: ["bannerImg"],
    queryFn: async () => {
      const response = await axiosPublic.get("/blogs/banner");
      return response.data;
    },
  });

  return { data, refetch };
};

export default useBanner;
