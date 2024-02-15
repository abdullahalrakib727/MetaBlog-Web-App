import { FC, useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// import useAxiosSecure from "../../hooks/useAxiosSecure";

import { useState } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlog:FC = ():JSX.Element => {
  
  const { user, sendVerificationEmail } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  // const axiosSecure = useAxiosSecure();

  // for jodit editor
  const [content, setContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Todo : will add react hook form here later

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

  const handleVerification = () => {
    sendVerificationEmail();
  };

  //? if user is not verified

  if (user?.emailVerified === false) {
    return (
      <div className="my-10">
        <Helmet>
          <title>Add Blog | MetaBlog</title>
        </Helmet>
        <div className="min-h-screen flex justify-center items-center">
          <div className="card w-full">
            <h1 className="dark:text-white text-center text-2xl font-semibold">
              Check your email to verify your account.
            </h1>
            <button
              onClick={handleVerification}
              className="mt-5 py-2 px-5 inline-block w-32 mx-auto bg-blue-600 rounded-xl hover:bg-blue-500 text-white hover:text-[#F0E3CA] transition-all hover:scale-110 duration-300"
            >
              Send Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  //? if user is verified

  return (
    <div className="my-10">
      <Helmet>
        <title>Add Blog | MetaBlog</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <div className="card w-full shadow-xl">
          <h1 className="dark:text-white text-center text-2xl font-semibold">
            Write a blog from here
          </h1>
          <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black dark:text-white">
                  Title
                </span>
              </label>
              <input
                type="text"
                name="blogTitle"
                placeholder="Blog's title"
                className="appearance-none focus:outline-none input bg-gray-200 dark:bg-white dark:border-white"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black dark:text-white">
                  Image URL
                </span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Thumbnail link"
                className="appearance-none focus:outline-none input bg-gray-200 dark:bg-white dark:border-white"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black dark:text-white">
                  Choose a Category
                </span>
              </label>
              <select
                name="category"
                className="appearance-none focus:outline-none select bg-gray-200 dark:bg-white dark:border-white w-full"
                required
              >
                <option value="Lifestyle">Life Style</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Business">Business</option>
                <option value="Economy">Economy</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black dark:text-white">
                  Body
                </span>
              </label>
              <JoditEditor
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                disabled={isSubmitting}
                className=" py-2 rounded-md text-white bg-[#4B6BFB] hover:bg-blue-400 transition-colors duration-300  dark:bg-[#4B6BFB] uppercase w-32 mx-auto"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
