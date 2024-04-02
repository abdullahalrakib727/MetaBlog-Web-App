import useAxiosSecure from "../api/useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

type AdminData = {
  isAdmin: boolean;
  success: boolean;
};

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userId = user?.uid;

  const { data: result = {} as AdminData, isLoading: loading } =
    useQuery<AdminData>({
      queryKey: ["user", userId],
      queryFn: async () => {
        const response = await axiosSecure(`/admin/${userId}`);
        return response.data;
      },
      enabled: !!userId,
    });

  return { result, loading };
};

export default useAdmin;
