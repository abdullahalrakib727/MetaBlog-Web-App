import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import useAdmin from "../hooks/useAdmin";
import useAboutUser from "../hooks/useAboutUser";

type AdminRouteProps = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  const navigate = useNavigate();
  const { isLoading } = useAboutUser();
  const { result, loading } = useAdmin();

  if (isLoading || loading) return <LoadingSpinner />;

  if (!result.isAdmin) {
    navigate("/dashboard");
  }

  return <>{children}</>;
};
export default AdminRoute;
