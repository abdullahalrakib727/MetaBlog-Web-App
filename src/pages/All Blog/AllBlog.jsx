import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Blog from "./Blog";

const AllBlog = () => {
  const blogs = useLoaderData();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(query) &&
      (selectedCategory === "" || blog.category === selectedCategory)
  );

  return (
    <div className="container mx-auto mb-10">
      <div className=" mt-10 mb-10 text-center">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search..."
          className="input input-bordered input-info w-full max-w-xs mr-5"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered select-info"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Tech">Tech</option>
        </select>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {filteredBlogs.map((blog) => (
          <Blog key={blog._id} blog={blog}></Blog>
        ))}
      </div>
    </div>
  );
};

export default AllBlog;
