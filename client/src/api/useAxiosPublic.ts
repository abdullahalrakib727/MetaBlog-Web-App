import axios, { AxiosInstance } from "axios";

const axiosPublic: AxiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http;//localhost:5000",
=======
  baseURL: "http://localhost:5000",
>>>>>>> main
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
