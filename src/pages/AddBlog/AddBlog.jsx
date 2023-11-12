import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const AddBlog = () => {
    const {user} = useContext(AuthContext);
    console.log(user)
 const handleSubmit = (e)=>{
    e.preventDefault();
    const title = e.target.title.value;
    const photoUrl = e.target.photo.value;
    const category = e.target.category.value;
    const shortDescription = e.target.short.value;
    const longDescription = e.target.long.value;
    const published = new Date();
    const authorEmail = user?.email;
    const authorName = user?.displayName;
    console.log({shortDescription,longDescription, published, authorEmail,authorName})

 }
  return (
    <div className="container mx-auto">
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
              <select name="category" className="select select-bordered w-full">
                <option disabled selected>
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
