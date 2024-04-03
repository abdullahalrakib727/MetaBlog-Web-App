import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../api/useAxiosSecure";
import useAuth from "./useAuth";

type DashboardData = {
  total: number;
  draft: number;
  published: number;
};

const useUserStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} as DashboardData ,isLoading } = useQuery<DashboardData>({
    queryKey: ["dashboard", user?.uid],
    queryFn: async () => {
      const response = await axiosSecure.get("/blogs/stats");
      return response.data.data;
    },
  });
  return { stats ,isLoading };
};

export default useUserStats;
