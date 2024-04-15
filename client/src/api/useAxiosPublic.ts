import axios, { AxiosInstance } from "axios";

const axiosPublic: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

// https://blog-website-server-theta.vercel.app
