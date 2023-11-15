import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  if (loading) {
    return <span className="loading loading-spinner min-h-screen flex justify-center items-center mx-auto loading-lg"></span>;
  }
  if (user) {
    return children;
  }
};

export default PrivateRoute;
