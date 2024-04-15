import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../api/useAxiosSecure";
import { BlogsProps } from "../../api/useBlogData";

const AllBlogsList = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [] as BlogsProps[], isLoading } = useQuery<BlogsProps[]>({
    queryKey: ["blogs-list"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/blogs");
      return response.data.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

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
              <th>Published</th>
              <th>Create Date</th>
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
                <td>{blog.status}</td>
                <td>{blog.published}</td>
                <td>
                  <button className="">Edit</button>
                </td>
                <td>
                  <button className="">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllBlogsList;
