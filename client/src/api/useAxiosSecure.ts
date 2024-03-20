import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const axiosSecure: AxiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http;//localhost:5000",
=======
  baseURL: "http://localhost:5000",
>>>>>>> main
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error tracked in interceptor", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          logOutUser();
          navigate("/login");
        }
      }
    );
  }, [logOutUser, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
