import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../api/useAxiosSecure";
import useAdmin from "./useAdmin";

type AllUsersData = {
  uid: string;
  email: string;
  photo: string;
  name: string;
  role: string;
}[];

const useGetAllUsersData = () => {
  const axiosSecure = useAxiosSecure();
  const { result, loading } = useAdmin();

  const { data = [] as AllUsersData, isLoading } = useQuery<AllUsersData>({
    queryKey: ["all-users"],
    queryFn: async () => {
      const response = await axiosSecure("/admin/users");

      return response.data.data;
    },
    enabled: result.isAdmin,
  });

  return { data, isLoading, loading, result };
};

export default useGetAllUsersData;
