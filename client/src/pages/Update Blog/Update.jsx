import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Update = () => {
  const params = useParams();
  const [updatedContent, setUpdatedContent] = useState();

  const { data: item = [], refetch } = useQuery({
    queryKey: ["item"],
    queryFn: async () => {
      const res = await axios.get(
        `https://blog-website-server-theta.vercel.app/blogs/${params.id}`,
        {
          withCredentials: true,
        }
      );
      return res.data.data;
    },
  });

  const navigate = useNavigate();

  // ToDo will add react hook form here later

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
            `https://blog-website-server-theta.vercel.app/blogs/${item?._id}`,
            updatedBlog,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            // console.log(res.data);
            if (res.data.data.modifiedCount > 0) {
              toast.success("Blog has been updated!");
              refetch();
              setTimeout(() => {
                navigate(`/blogs/${item?._id}`);
              }, 3000);
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
        <title>Update | MetaBlog</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <form className="card-body" onSubmit={handleUpdate}>
          <h1 className="text-center dark:text-white text-2xl font-semibold">
            Update : {item?.title}
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text dark:text-white">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder={item?.title}
              className="input border-2 border-[#181A2A] dark:border-white"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text dark:text-white">Image URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder={item?.photoUrl}
              className="input border-2 border-[#181A2A] dark:border-white"
              required
            />
          </div>
          {/* select will be used */}
          <div className="form-control">
            <label className="label">
              <span className="label-text dark:text-white">
                Choose a Category
              </span>
            </label>
            <select
              defaultValue={item?.category}
              name="category"
              className="select border-2 border-[#181A2A] dark:border-white w-full"
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
              <span className="label-text dark:text-white">Body</span>
            </label>
            <JoditEditor
              value={item?.content}
              dark={true}
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
