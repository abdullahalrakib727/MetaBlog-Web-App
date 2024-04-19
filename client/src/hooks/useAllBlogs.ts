import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useAxiosPublic from "../api/useAxiosPublic";
import useRecentBlogs from "../api/useRecentBlogs";
import { BlogsProps } from "../api/useBlogData";
import { useQuery } from "@tanstack/react-query";
import useAlllBlogsPage from "./useAlllBlogsPage";

const useAllBlogs = () => {
  //* hooks

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(category || "all");

  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  //* data fetching

  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useRecentBlogs();

  const {
    data: allBlogs = [] as BlogsProps[],
    refetch,
    isLoading: loading,
  } = useQuery<BlogsProps[]>({
    queryKey: ["all-blogs", category, selectedCategory, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/blogs?page=${currentPage}&category=${selectedCategory}`
      );
      return res.data.data;
    },
  });

  const { pages, reload } = useAlllBlogsPage(selectedCategory);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
    navigate(`/blogs?page=${page}&category=${selectedCategory}`);
  };

  //* hooks
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  useEffect(() => {
    refetch();
  }, [selectedCategory, currentPage]);

  //* functions

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    if (e.target.value === "all") {
      setSelectedCategory("all");
      navigate(`/blogs?page=${currentPage}&category=all`);
      return;
    } else {
      setSelectedCategory(e.target.value);
      navigate(`/blogs?page=${currentPage}&category=${e.target.value}`);
    }
  };

  return {
    allBlogs,
    isLoading,
    loading,
    handleChange,
    selectedCategory,
    data,
    category,
    refetch,
    pages,
    reload,
    handlePageChange,
  };
};

export default useAllBlogs;
