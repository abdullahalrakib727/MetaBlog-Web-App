import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../api/useAxiosSecure";
import toast from "react-hot-toast";

import { FieldValues, useForm } from "react-hook-form";
import useBlogDetail from "./useBlogDetail";
import useAllBlogs from "./useAllBlogs";
import useAxiosPublic from "../api/useAxiosPublic";

export default function useUpdateBlog() {
  // ! hooks
  // ! details of the current blog
  const { data: item, fecthing, slug } = useBlogDetail();

  const axiosSecure = useAxiosSecure();
  const [updatedContent, setUpdatedContent] = useState(item?.content || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // ! fetch all blogs
  const { refetch: reload } = useAllBlogs();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ! submit the updated blog

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const title = data?.title || item?.title;
    const thubmnail = data?.photoUrl[0];
    const category = data?.category || item?.category;

    const imgApiKey = import.meta.env.VITE_IMG_API_KEY;

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgApiKey}`;

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      // ! if user wants to save the changes
      if (result.isConfirmed) {
        const formData = new FormData();
        if (thubmnail) {
          formData.append("image", thubmnail);
        }

        const response = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const photoUrl =
          (await response.data.data.display_url) || item?.photoUrl;

        const updatedBlog = {
          title,
          photoUrl,
          category,
          content: updatedContent || item?.content,
        };

        await axiosSecure
          .patch(`/blogs/${slug}`, updatedBlog, {
            withCredentials: true,
          })
          .then((res) => {
            reload();
            if (res.data.success) {
              toast.success("Blog has been updated!");
              setLoading(false);
              fecthing();
              navigate("/dashboard/profile");
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
            setLoading(false);
          });
      } else if (result.isDenied) {
        setLoading(false);
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return {
    item,
    updatedContent,
    setUpdatedContent,
    loading,
    onSubmit,
    handleSubmit,
    register,
    errors,
  };
}
