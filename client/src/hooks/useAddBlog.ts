import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import useAllBlogs from "./useAllBlogs";
import useAxiosSecure from "../api/useAxiosSecure";
import useAdmin from "./useAdmin";

export default function useAddBlog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { refetch } = useAllBlogs();

  const { result } = useAdmin();

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const title = data.title;
    const photoUrl = data.photoUrl;
    const category = data.category;
    const published = new Date();
    const authorId = user?.uid;
    const authorName = user?.displayName;
    const authorImg = user?.photoURL;

    let status;

    if (result.isAdmin) {
      status = "published";
    } else {
      status = "draft";
    }

    const BlogData = {
      title,
      photoUrl,
      category,
      authorId,
      content,
      published,
      authorName,
      authorImg,
      status,
    };

    try {
      const res = await axiosSecure.post("/blogs", BlogData);
      if (res.data) {
        refetch();
        setLoading(false);
        toast.success("Blog has been added!");
        navigate("/dashboard/profile");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    content,
    setContent,
    handleSubmit,
    register,
    errors,
    onSubmit,
    loading,
  };
}
