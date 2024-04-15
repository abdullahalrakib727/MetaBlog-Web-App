import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../api/useAxiosSecure";
import { BlogsProps } from "../../api/useBlogData";
import { format, parseISO } from "date-fns";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import useTotalPageCount from "../../hooks/useTotalPageCount";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useState } from "react";

const AllBlogsList = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  const {
    data = [] as BlogsProps[],
    isLoading,
    refetch,
    isError,
  } = useQuery<BlogsProps[]>({
    queryKey: ["blogs-list", currentPage],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/admin/blogs?page=${currentPage}`
      );

      return response.data.data;
    },
  });

  const { pages } = useTotalPageCount();

  const Totalpages = [...Array(pages).keys()];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
    navigate(`/dashboard/all-blogs?page=${page}`);
  };

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

      <div className="overflow-x-auto mt-20">
        <table className="table">
          {/* head */}
          <thead>
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
                  <button className="text-2xl bg-blue-400 p-2 rounded-md hover:bg-blue-700 transition-colors duration-300 hover:text-white">
                    <CiEdit />
                  </button>
                </td>
                <td>
                  <button className="text-2xl bg-blue-400 p-2 rounded-md hover:bg-red-600 transition-colors duration-300 hover:text-white">
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-center items-center m-auto fixed bottom-10 left-0 w-full">
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
