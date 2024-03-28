import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../api/useAxiosSecure";
import PrivateRoute from "./PrivateRoute";

type AdminRouteProps = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const userId = user?.uid;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await axiosSecure(`/admin/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });

  if (isLoading)
    return (
      <span className="loading loading-spinner min-h-screen flex justify-center items-center mx-auto loading-lg dark:text-white"></span>
    );

  if (data.isAdmin === false) return <p>Access Denied</p>;

  return <PrivateRoute>{children}</PrivateRoute>;
};

export default AdminRoute;
