import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useWIshlist = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const url = `/wishlist?email=${user?.email}`;

  const { data: wishlists = [], refetch } = useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const res = await axiosSecure.get(url);

      return res.data;
    },
  });
  return [wishlists, refetch];
};

export default useWIshlist;
