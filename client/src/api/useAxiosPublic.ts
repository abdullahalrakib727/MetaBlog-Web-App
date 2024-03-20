import axios, { AxiosInstance } from "axios";

const axiosPublic: AxiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "https://blog-website-server-theta.vercel.app",
=======

  baseURL: "http;//localhost:5000",

>>>>>>> 5f5584f0d26d05f278ff37cf66a3a310fe135a73
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
