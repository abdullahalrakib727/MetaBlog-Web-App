import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useWIshlist = () => {
    const { user } = useContext(AuthContext);
 
    
    const url = `http://localhost:5000/wishlist?email=${user?.email}`;
  
    const {data:wishlists=[], refetch} = useQuery({
      queryKey: ['wishlists'],
      queryFn: async() =>{
        const res=await axios.get(url);
       return res.data;
  
      }
    });
    // console.log(wishlists)
    return [wishlists,refetch]
};

export default useWIshlist;