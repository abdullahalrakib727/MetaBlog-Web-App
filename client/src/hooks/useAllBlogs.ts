import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../api/useAxiosPublic";
import useRecentBlogs from "../api/useRecentBlogs";
import { BlogsProps } from "../api/useBlogData";
import { useQuery } from "@tanstack/react-query";


const useAllBlogs = () => {
   //* hooks

   const navigate = useNavigate();
   const [selectedCategory, setSelectedCategory] = useState<string>("");
   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const category = params.get("category");
 
   //* data fetching
 
   const axiosPublic = useAxiosPublic();
   const { data, isLoading } = useRecentBlogs();
 
   const {
     data: allBlogs = [],
     refetch,
     isLoading: loading,
   } = useQuery<BlogsProps[], unknown>({
     queryKey: ["all-blogs", selectedCategory],
     queryFn: async () => {
       const res = await axiosPublic.get(`/blogs${selectedCategory}`);
       return res.data.data;
     },
   });
 
   //* hooks
 
   useEffect(() => {
     if (category) {
       setSelectedCategory(`?category=${category}`);
     }
   }, [category]);
 
   useEffect(() => {
     refetch();
   }, [selectedCategory, refetch]);
 
   //* functions
 
   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     if (e.target.value === "") {
       setSelectedCategory("");
       navigate("/blogs");
       return;
     } else {
       setSelectedCategory("?category=" + e.target.value);
       navigate(`/blogs?category=${e.target.value}`);
     }
   };
 
return { allBlogs, isLoading, loading, handleChange, selectedCategory, data, category };
};

export default useAllBlogs;