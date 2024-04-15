import  { useState } from 'react';
import useTotalPageCount from './useTotalPageCount';
import { BlogsProps } from '../api/useBlogData';
import useAxiosSecure from '../api/useAxiosSecure';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const useAllBlogList = () => {
    const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  const {
    data = [] as BlogsProps[],
    isLoading,
    refetch,
    isError,
  } = useQuery<BlogsProps[]>({
    queryKey: ["blogs-list", currentPage],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/admin/blogs?page=${currentPage}`
      );

      return response.data.data;
    },
  });

  const { pages } = useTotalPageCount();

  const Totalpages = [...Array(pages).keys()];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
    navigate(`/dashboard/all-blogs?page=${page}`);
  };

  const handleChangeStatus = async (id: string, cstatus: string) => {
    const status = cstatus === "published" ? "draft" : "published";

    Swal.fire({
      title: "Do you want to change the staus of the blog?",
      text: `Blog status will be changed from ${cstatus} to ${status}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(`/admin/blogs/${id}`, {
            status,
          });
          if (response.data.success) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: "Blog status has been changed !!.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleDeleteBlog = async (id: string) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be deleted and you won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/admin/blogs/${id}`);
          if (response.data.success) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: "Blog has been deleted !!.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };


return {data, isLoading, isError, Totalpages, handlePageChange, handleChangeStatus, handleDeleteBlog}

};

export default useAllBlogList;