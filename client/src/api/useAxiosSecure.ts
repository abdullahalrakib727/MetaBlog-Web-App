import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const axiosSecure: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
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
        if (error.response.status === 500) {
          toast.error("Server error, please try again later");
        }
        if (error.response.status === 401 || error.response.status === 403) {
          toast.error("Unauthorized, please login again");
          logOutUser();
          navigate("/login");
        }
      }
    );
  }, [logOutUser, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
