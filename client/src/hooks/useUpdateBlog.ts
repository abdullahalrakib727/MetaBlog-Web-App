
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../api/useAxiosSecure";
import toast from "react-hot-toast";

import { FieldValues, useForm } from "react-hook-form";
import useBlogDetail from "./useBlogDetail";

export default function useUpdateBlog() {

  const axiosSecure = useAxiosSecure();
  const [updatedContent, setUpdatedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: item, fecthing } = useBlogDetail();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      if (result.isConfirmed) {
        await axiosSecure
          .put(`/blogs/${title.split(' ').join('-').replace(/[*+~.,;()'"!:@]/g, '').toLowerCase()}`, updatedBlog, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.success) {
              toast.success("Blog has been updated!");
              setLoading(false);
              fecthing();
              navigate(
                `/blogs/${title
                  .split(" ")
                  .join("-")
                  .replace(/[*+~.,;()'"!:@]/g, "")
                  .toLowerCase()}`
              );
            }
          })
          .catch((error) => {
            console.log(error);
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
