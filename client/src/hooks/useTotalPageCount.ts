import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../api/useAxiosSecure";

const useTotalPageCount = (staus:string) => {
  const axiosSecure = useAxiosSecure();

  const { data: pages = {},refetch:reload } = useQuery({
    queryKey: ["total-page",staus],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/page-count?status="+staus);
      return response.data.data;
    },
  });

return { pages,reload };

};

export default useTotalPageCount;
