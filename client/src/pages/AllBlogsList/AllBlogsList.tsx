import { Link } from "react-router-dom";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import useAllBlogList from "../../hooks/useAllBlogList";
import { Helmet } from "react-helmet";
import CategorySelect from "../../components/CategorySelect/CategorySelect";
import Pagintaion from "../../components/shared/Pagination/Pagintaion";
import BlogTable from "../../components/BlogTable/BlogTable";

const AllBlogsList = () => {
  const {
    data,
    totalPages,
    handleChangeStatus,
    handleDeleteBlog,
    handlePageChange,
    isError,
    isLoading,
    handleFilter,
    status,
  } = useAllBlogList();

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <section className="flex flex-col gap-10 h-screen justify-center items-center">
        <h1 className="text-2xl font-bold text-red-600">
          No Data Found with this query !!
        </h1>
        <Helmet>
          <title>No Data Found | MetaBlog</title>
        </Helmet>
        <Link to="/dashboard" className="btn">
          Go Back to Dashboard
        </Link>
      </section>
    );

  const categoryList = [
    { value: "all", label: "All" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  return (
    <section className="dark:text-white">
      <h1>All Blogs</h1>
      <>
        <Helmet>
          <title>All Blogs List | MetaBlog</title>
        </Helmet>
      </>
      <>
        <CategorySelect
          category={status}
          handleChange={handleFilter}
          categoryList={categoryList}
        />
      </>
      <div className="overflow-x-auto">
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
              <BlogTable
                key={blog._id}
                blog={blog}
                handleChangeStatus={handleChangeStatus}
                handleDeleteBlog={handleDeleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-center items-center m-auto fixed bottom-2 left-0 w-full">
        {totalPages.map((i) => (
          <Pagintaion key={i} i={i} handlePageChange={handlePageChange} />
        ))}
      </div>
    </section>
  );
};

export default AllBlogsList;
