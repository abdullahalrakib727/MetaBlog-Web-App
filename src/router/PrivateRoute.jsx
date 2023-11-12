import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to='/'></Navigate>
  }
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user) {
    return children;
  }
};

export default PrivateRoute;
