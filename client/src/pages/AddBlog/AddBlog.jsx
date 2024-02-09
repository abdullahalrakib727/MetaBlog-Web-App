import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Providers/AuthProvider";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { useState } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // for jodit editor
  const [content, setContent] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // ToDo will add react hook form here later

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const form = e.target;
      const title = e.target.title.value;
      const photoUrl = e.target.photo.value;
      const category = e.target.category.value;
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
      const res = await axiosSecure.post("/blogs", data);

      if (res.data.insertedId) {
        toast.success("Blog has been added!");
        navigate("/blogs");
        form.reset();
      }
    } catch (error) {
      toast.error("error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-10">
      <Helmet>
        <title>Add Blog | MetaBlog</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <div className="card w-full shadow-md">
          <h1 className="dark:text-white text-center text-2xl font-semibold">
            Write a blog from here
          </h1>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Blog's title"
                className="input border-2 border-[#181A2A] dark:border-white"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Thumbnail link"
                className="input border-2 border-[#181A2A] dark:border-white"
                required
              />
            </div>
            {/* select will be used */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Choose a Category</span>
              </label>
              <select
                name="category"
                className="select border-2 border-[#181A2A] dark:border-white w-full"
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
                <span className="label-text">Body</span>
              </label>
              <JoditEditor
                value={content}
                onChange={(newContent) => setContent(newContent)}
                dark={true}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn  dark:bg-white text-black uppercase">
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
