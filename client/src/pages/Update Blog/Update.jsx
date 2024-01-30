import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useState } from "react";

const Update = () => {
  const params = useParams();
  const [updatedContent, setUpdatedContent] = useState();

  const { data: item = [] } = useQuery({
    queryKey: ["item"],
    queryFn: async () => {
      const res = await axios.get(
        `https://blog-website-server-theta.vercel.app/all/${params.id}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  const { _id, title, photoUrl, category, content:body } = item;


  const handleUpdate = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const photoUrl = e.target.photo.value;
    const category = e.target.category.value;
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
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://blog-website-server-theta.vercel.app/all/${_id}`,
            updatedBlog,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Blog Has been Updated!",
                icon: "success",
              });
            }
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <div className="card w-full shadow-md min-h-screen my-10">
      <Helmet>
        <title>MetaBlog | Add Blog</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <form className="card-body" onSubmit={handleUpdate}>
        <h1 className="text-center dark:text-white text-2xl font-semibold">Update : {title}</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text dark:text-white">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Blog's title"
              defaultValue={title}
              className="input border-2 border-[#181A2A] dark:border-white"
              // required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text dark:text-white">Image URL</span>
            </label>
            <input
              defaultValue={photoUrl}
              type="text"
              name="photo"
              placeholder="Thumbnail link"
              className="input border-2 border-[#181A2A] dark:border-white"
              // required
            />
          </div>
          {/* select will be used */}
          <div className="form-control">
            <label className="label">
              <span className="label-text dark:text-white">Choose a Category</span>
            </label>
            <select
              defaultValue={category}
              name="category"
              className="select border-2 border-[#181A2A] dark:border-white w-full"
            >
              <option>Food</option>
              <option>Health</option>
              <option>Entertainment</option>
              <option>Tech</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text dark:text-white">Body</span>
            </label>
            <JoditEditor
              value={body}
              onChange={(newContent) => setUpdatedContent(newContent)}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn  dark:bg-white text-black uppercase">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
