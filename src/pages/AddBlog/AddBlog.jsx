import axios from "axios";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const AddBlog = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = e.target.title.value;
    const photoUrl = e.target.photo.value;
    const category = e.target.category.value;
    const shortDescription = e.target.short.value;
    const longDescription = e.target.long.value;
    const published = new Date();
    const authorEmail = user?.email;
    const authorName = user?.displayName;
    const authorImg = user?.photoURL;
    const data = {
      title,
      photoUrl,
      category,
      shortDescription,
      longDescription,
      published,
      authorEmail,
      authorName,
      authorImg,
    };
    const url = "http://localhost:5000/all";
    axios.post(url, data, { withCredentials: true }).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Blog Has been Added!",
          icon: "success",
        });
        form.reset();
      }
    });
  };
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Blog-Zone || Add Blog</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <div className="card w-full shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title of the Blog"
                className="input input-bordered"
                // required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Url of the image"
                className="input input-bordered"
                // required
              />
            </div>
            {/* select will be used */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Choose a Category</span>
              </label>
              <select defaultValue='disabled' name="category" className="select select-bordered w-full">
                <option value='disabled' disabled>
                  Select a Category
                </option>
                <option>Food</option>
                <option>Health</option>
                <option>Entertainment</option>
                <option>Tech</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Short Description</span>
              </label>
              <textarea
                name="short"
                className="textarea textarea-bordered"
                placeholder="Short Description"
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Long Description</span>
              </label>
              <textarea
                name="long"
                className="textarea textarea-bordered"
                placeholder="Long Description"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn register-btn normal-case">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
