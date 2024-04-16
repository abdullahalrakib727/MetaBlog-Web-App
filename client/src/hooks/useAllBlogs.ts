import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../api/useAxiosPublic";
import useRecentBlogs from "../api/useRecentBlogs";
import { BlogsProps } from "../api/useBlogData";
import { useQuery } from "@tanstack/react-query";


const useAllBlogs = () => {
   //* hooks

   const navigate = useNavigate();
   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const category = params.get("category");
   const [selectedCategory, setSelectedCategory] = useState(category || "");
 
   //* data fetching
 
   const axiosPublic = useAxiosPublic();
   const { data, isLoading } = useRecentBlogs();
 
   const {
     data: allBlogs = [],
     refetch,
     isLoading: loading,
   } = useQuery<BlogsProps[], unknown>({
     queryKey: ["all-blogs",category, selectedCategory],
     queryFn: async () => {
       const res = await axiosPublic.get(`/blogs?category=${selectedCategory}`);
       return res.data.data;
     },
   });
 
   //* hooks
   useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  useEffect(() => {
    refetch();
  }, [selectedCategory, refetch]);
 
   //* functions
 
   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     if (e.target.value === "") {
       setSelectedCategory("");
       navigate("/blogs?category=all");
       return;
     } else {
       setSelectedCategory(e.target.value);
       navigate(`/blogs?category=${e.target.value}`);
     }
   };
 
return { allBlogs, isLoading, loading, handleChange, selectedCategory, data, category, refetch };
};

export default useAllBlogs;