import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://blog-website-server-theta.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
