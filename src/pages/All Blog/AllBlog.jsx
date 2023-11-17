import { useState } from "react";

import { Helmet } from "react-helmet";
import Blog from "./Blog";
import { Input } from 'antd';
import useBlogData from "../../hooks/useBlogData";
const AllBlog = () => {
  const [blogs,isLoaded] = useBlogData()
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(query) &&
      (selectedCategory === "" || blog.category === selectedCategory)
  );

  return (
    <div className="container min-h-screen mx-auto mb-10">
      <Helmet>
        <title>Blog-Zone || All Blogs</title>
      </Helmet>
      <div className="w-3/4 mx-auto  justify-between mt-10 mb-10 text-center flex flex-col gap-5 md:flex-row">


        <Input placeholder="Search..." className="w-1/2" onChange={(e) => {
          const search = e.target.value;
          const searchLower = search.toLowerCase()
          setQuery(searchLower)
        }}  />
 



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
      <div className=" grid grid-cols-1 md:grid-cols-2 mx-2 lg:grid-cols-3 gap-5 ">
        {filteredBlogs.map((blog) => (
          <Blog key={blog._id} isLoaded={isLoaded} blog={blog}></Blog>
        ))}
      </div>
    </div>
  );
};

export default AllBlog;
