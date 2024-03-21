import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const axiosSecure: AxiosInstance = axios.create({
  baseURL: "https://blog-website-server-theta.vercel.app",
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
        toast.error(error.response.data.message);
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
