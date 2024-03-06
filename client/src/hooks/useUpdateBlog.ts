import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../api/useAxiosSecure";
import toast from "react-hot-toast";
import { BlogsProps } from "../api/useBlogData";

export default function useUpdateBlog() {
  
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const [updatedContent, setUpdatedContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { data: item = {} as BlogsProps, refetch } = useQuery<BlogsProps>({
    queryKey: ["item", params.id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${params.id}`);
      return res.data.data;
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget as HTMLFormElement;
    const title = form.blogTitle.value;
    const photoUrl = form.photo.value;
    const category = form.category.value;

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
          .patch(`/blogs/${item?._id}`, updatedBlog, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.data.modifiedCount > 0) {
              toast.success("Blog has been updated!");
              setIsSubmitting(false);
              refetch();
              navigate(`/blogs/${item?._id}`);
            }
          });
      } else if (result.isDenied) {
        setIsSubmitting(false);
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return {
    item,
    updatedContent,
    setUpdatedContent,
    isSubmitting,
    handleUpdate,
  };
}
