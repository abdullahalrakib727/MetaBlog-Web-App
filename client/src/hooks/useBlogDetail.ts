import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosSecure from "../api/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const useBlogDetail = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
  
  
    const params = useParams();
    const navigate = useNavigate();
  
    const { data = {}, isLoading } = useQuery({
      queryKey: ["blog", params.id],
      queryFn: async () => {
        const res = await axiosSecure.get(`/blogs/${params.id}`);
        return res.data.data;
      },
    });
  
    const {
      _id,
      title,
      photoUrl,
      authorImg,
      authorName,
      published,
      authorId,
      content,
    } = data || {};
  
    const applyDarkMode = (tagName: string, className: string) => {
      const elements = document.getElementsByTagName(tagName);
      const elementsArray = Array.from(elements);
      elementsArray.forEach((element) => {
        element.classList.add(className);
      });
    };
  
    useEffect(() => {
      applyDarkMode("strong", "dark:text-white");
      applyDarkMode("h1", "dark:text-white");
      applyDarkMode("h2", "dark:text-white");
      applyDarkMode("h3", "dark:text-white");
      applyDarkMode("h4", "dark:text-white");
      applyDarkMode("h5", "dark:text-white");
      applyDarkMode("h6", "dark:text-white");
      applyDarkMode("p", "dark:text-[#BABABF]");
      applyDarkMode("a", "dark:text-white");
      applyDarkMode("span", "dark:text-white");
      applyDarkMode("td", "dark:text-white");
      applyDarkMode("article", "dark:text-white");
      applyDarkMode("button", "dark:text-white");
      applyDarkMode("textarea", "dark:text-white");
    }, [content]);
  
    const isValidDate = published && !isNaN(Date.parse(published));
  
    const publishDate = isValidDate
      ? format(parseISO(published), "MMMM dd, yyyy")
      : null;
  
    const handleDelete = (id: string) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/blogs/${id}`);
  
            if (res.data.deletedCount > 0) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your Blog has been deleted.",
                icon: "success",
              });
              navigate("/");
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your Blog is safe :)",
              icon: "error",
            });
          }
        });
    };

    return {isLoading,handleDelete,publishDate,authorName,authorImg,title,photoUrl,content,authorId,_id,user,data};

}

export default useBlogDetail;