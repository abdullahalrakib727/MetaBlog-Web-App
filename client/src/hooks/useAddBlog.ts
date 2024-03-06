import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../api/useAxiosPublic";
import useAuth from "./useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAddBlog(){

  
    const { user  } = useAuth();
    const axiosPublic = useAxiosPublic();
  
    const [content, setContent] = useState("");
  
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (isSubmitting) {
        return;
      }
  
      const form = e.currentTarget as HTMLFormElement;
      const title = form.blogTitle.value;
      const photoUrl = form.photo.value;
      const category = form.category.value;
      const published = new Date();
      const authorId = user?.uid;
      const authorName = user?.displayName;
      const authorImg = user?.photoURL;
      const data = {
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
        const res = await axiosPublic.post("/blogs", data);
        setIsSubmitting(true);
  
        if (res.data.insertedId) {
          toast.success("Blog has been added!");
          setIsSubmitting(false);
          form.reset();
          navigate("/blogs");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsSubmitting(false);
      }
    };



    return {user,content, setContent, isSubmitting, handleSubmit}
  
}