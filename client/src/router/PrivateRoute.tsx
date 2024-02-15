import { FC, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
// import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;

}


const PrivateRoute:FC<PrivateRouteProps> = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <span className="loading loading-spinner min-h-screen flex justify-center items-center mx-auto loading-lg"></span>
    );
  }
  if (user) {
    return children;
  }

  return (
    <Navigate to="/login" state={{ from: location }} replace/>
  );
};

export default PrivateRoute;
