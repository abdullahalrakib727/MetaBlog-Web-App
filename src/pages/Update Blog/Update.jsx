
import Swal from "sweetalert2";


import {  useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Update = () => {
const params = useParams();
  const {data:item=[]} = useQuery({
    queryKey: ['item'],
    queryFn : async()=>{
      const res = await axios.get(`http://localhost:5000/all/${params.id}`,{withCredentials:true})
      return res.data;
    }
  })

  const { _id, title, photoUrl, category, shortDescription, longDescription } =
    item;

  const handleUpdate = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const photoUrl = e.target.photo.value;
    const category = e.target.category.value;
    const shortDescription = e.target.short.value;
    const longDescription = e.target.long.value;
    const updatedBlog = {
      title,
      photoUrl,
      category,
      shortDescription,
      longDescription,
    };


    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.patch(`http://localhost:5000/all/${_id}`,updatedBlog,{withCredentials:true}).then(res=>{
          console.log(res.data)
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Blog Has been Updated!",
              icon: "success",
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

   
  };
  return (
    <div className="container mx-auto">
       <Helmet>
        <title>Blog-Zone || Update</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center mt-10">
        <div className="card w-full shadow-2xl bg-base-100">
          <h3 className="text-center text-3xl mb-5 font-bold mt-5">
            Update Your Blog
          </h3>
          <form className="card-body" onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                defaultValue={title}
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
                defaultValue={photoUrl}
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
              <select
                defaultValue={category}
                name="category"
                className="select select-bordered w-full"
              >
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
                defaultValue={shortDescription}
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
                defaultValue={longDescription}
                name="long"
                className="textarea textarea-bordered"
                placeholder="Long Description"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn register-btn normal-case">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
