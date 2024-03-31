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
        console.error(error);
        toast.error("Session expired, please login again");
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
