import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../api/useAxiosSecure";
import toast from "react-hot-toast";

import { FieldValues, useForm } from "react-hook-form";
import useBlogDetail from "./useBlogDetail";
import useAllBlogs from "./useAllBlogs";

export default function useUpdateBlog() {
  // ! hooks

  const axiosSecure = useAxiosSecure();
  const [updatedContent, setUpdatedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ! fetch all blogs
  const { refetch: reload } = useAllBlogs();

  // ! details of the current blog
  const { data: item, fecthing,slug } = useBlogDetail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ! submit the updated blog

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const title = data.title;
    const photoUrl = data.photoUrl;
    const category = data.category;

    const updatedBlog = {
      title,
      photoUrl,
      category,
      content: updatedContent,
    };

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      // ! if user wants to save the changes
      if (result.isConfirmed) {
        await axiosSecure
          .patch(
            `/blogs/${slug}`,
            updatedBlog,
            {
              withCredentials: true,
            }
          )
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
