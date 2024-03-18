import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../api/useAxiosPublic";
import useAuth from "./useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";

export default function useAddBlog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const title = data.title;
    const photoUrl = data.photoUrl;
    const category = data.category;
    const published = new Date();
    const authorId = user?.uid;
    const authorName = user?.displayName;
    const authorImg = user?.photoURL;

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
      const res = await axiosPublic.post("/blogs", BlogData);
      if (res.data) {
        toast.success("Blog has been added!");
        setLoading(false);
        navigate("/blogs");
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
