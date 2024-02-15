import axios, { AxiosInstance } from "axios";

const axiosPublic:AxiosInstance = axios.create({
  baseURL: "https://blog-website-server-theta.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
