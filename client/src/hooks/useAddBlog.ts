import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import useAllBlogs from "./useAllBlogs";
import useAxiosSecure from "../api/useAxiosSecure";
import useAxiosPublic from "../api/useAxiosPublic";

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
  const axiosPublic = useAxiosPublic();

  const { refetch } = useAllBlogs();

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const title = data.title;
    const thubmnail = data.photoUrl[0];
    const category = data.category;
    const published = new Date();
    const authorId = user?.uid;
    const authorName = user?.displayName;
    const authorImg = user?.photoURL;

    const imgApiKey = import.meta.env.VITE_IMG_API_KEY;

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgApiKey}`;

    const formData = new FormData();
    if (thubmnail) {
      formData.append("image", thubmnail);
    }

    const response = await axiosPublic.post(image_hosting_api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const photoUrl = await response.data.data.display_url;

    const BlogData = {
      title,
      photoUrl,
      category,
      authorId,
      content,
      published,
      authorName,
      authorImg,
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
