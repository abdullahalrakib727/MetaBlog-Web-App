import { format, parseISO } from "date-fns";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { BlogData } from "../../TypeDefination/TypeDefination";
import React from "react";
import useAxiosSecure from "../../api/useAxiosSecure";
import toast from "react-hot-toast";

type BlogTableProps = {
  blogs: BlogData[];
  handleChangeStatus: (id: string, status: string) => void;
  handleDeleteBlog: (id: string) => void;
  refetch: () => void;
};

const BlogTable = ({
  blogs,
  handleChangeStatus,
  handleDeleteBlog,
  refetch
}: BlogTableProps) => {
  const axiosSecure = useAxiosSecure();

  const setBanner = async (id: string) => {
    const response = await axiosSecure.patch(`/blogs/banner/${id}`);

    if (response.data.success) {
      toast.success("Banner Set Successfully");
      refetch();
    }

    if (response.data.error) {
      toast.error(response.data.error);
    }
  };

  return (
    <table className="table dark:text-white">
      {/* head */}
      <thead className="dark:text-white">
        <tr>
          <th></th>
          <th>Blog Title</th>
          <th>Author</th>
          <th>Create Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <React.Fragment key={blog?._id}>
            <tr>
              <td>
                <img
                  src={blog.photoUrl}
                  alt={blog.title}
                  className="h-20 w-16 object-contain"
                />
              </td>
              <td>{blog.title}</td>
              <td>{blog.authorName}</td>
              <td>{format(parseISO(blog.published), "dd, M, yyyy")}</td>
              <td>{blog.status}</td>
              <td>
                <button className="hover:bg-blue-500 p-2 hover:text-white transition-all duration-300 rounded-md">
                  <Link to={`/blogs/${blog.slug}`}>Details</Link>
                </button>
              </td>
              <td>
                <button
                  disabled={blog?.banner}
                  onClick={() => setBanner(blog._id)}
                  className="hover:bg-blue-500 p-2 hover:text-white transition-all duration-300 rounded-md"
                >
                  Set as Banner
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleChangeStatus(blog._id, blog.status)}
                  className="text-2xl bg-blue-400 p-2 rounded-md hover:bg-blue-700 transition-colors duration-300 hover:text-white"
                >
                  <CiEdit />
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="text-2xl bg-blue-400 p-2 rounded-md hover:bg-red-600 transition-colors duration-300 hover:text-white"
                >
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default BlogTable;
