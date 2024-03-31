import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../api/useAxiosSecure";
import PrivateRoute from "./PrivateRoute";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

type AdminRouteProps = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { user } = useAuth();
  const userId = user?.uid;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await axiosSecure(`/admin/${userId}`);
      return response.data;
    },
  });

  console.log(data);


  if (!data.isAdmin) return navigate("/dashboard");

  return <PrivateRoute>{children}</PrivateRoute>;
};

export default AdminRoute;
