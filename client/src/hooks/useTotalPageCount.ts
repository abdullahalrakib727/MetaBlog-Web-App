import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../api/useAxiosSecure";

const useTotalPageCount = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pages = {} } = useQuery({
    queryKey: ["total-page"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/page-count");
      return response.data.data;
    },
  });

return { pages };

};

export default useTotalPageCount;
