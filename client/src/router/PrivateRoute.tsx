import { FC, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
    <LoadingSpinner/>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user) return children;
};

export default PrivateRoute;
