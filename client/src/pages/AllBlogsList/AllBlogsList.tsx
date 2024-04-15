import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import useAllBlogList from "../../hooks/useAllBlogList";
import { Helmet } from "react-helmet";

const AllBlogsList = () => {
  const {
    data,
    Totalpages,
    handleChangeStatus,
    handleDeleteBlog,
    handlePageChange,
    isError,
    isLoading,
  } = useAllBlogList();

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <h1 className="text-2xl flex font-bold text-red-600 h-screen justify-center items-center">
        No Data Found with this query !!
      </h1>
    );

  return (
    <section className="dark:text-white">
      <h1>All Blogs</h1>
      <>
        <Helmet>
          <title>All Blogs List | MetaBlog</title>
        </Helmet>
      </>
      <div className="overflow-x-auto mt-20">
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
            {data.map((blog) => (
              <tr key={blog._id}>
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
            ))}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-center items-center m-auto fixed bottom-2 left-0 w-full">
        {Totalpages.map((i) => (
          <button
            onClick={() => handlePageChange(i + 1)}
            className="join-item btn"
            key={i}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default AllBlogsList;
