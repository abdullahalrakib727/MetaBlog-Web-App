import { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Input } from "antd";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import useBlogData from "../../hooks/useBlogData";

import RecentBlogCard from "../Recent Blog/RecentBlogCard";
const AllBlog = () => {
  const [blogs, isLoaded] = useBlogData();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const recentBlogs = blogs.sort(
    (a, b) => new Date(a.published) - new Date(b.published)
  );

  const filteredBlogs = recentBlogs.filter(
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
        <Input
          placeholder="Search..."
          className="w-1/2"
          onChange={(e) => {
            const search = e.target.value;
            const searchLower = search.toLowerCase();
            setQuery(searchLower);
          }}
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
      <ChakraProvider>
        {isLoaded ? (
          <Skeleton height="600px"></Skeleton>
        ) : (
          <div className="flex justify-center">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {filteredBlogs.map((blog) => (
              <RecentBlogCard key={blog._id} isLoaded={isLoaded} blog={blog}></RecentBlogCard>
            ))}
          </div>
          </div>
        )}
      </ChakraProvider>
    </div>
  );
};

export default AllBlog;
