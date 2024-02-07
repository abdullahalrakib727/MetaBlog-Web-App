import { useState } from "react";

import {  ChakraProvider,} from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import useBlogData from "../../hooks/useBlogData";

import RecentBlogCard from "../Recent Blog/RecentBlogCard";
import { TfiSearch } from "react-icons/tfi";
import CardSkeleton from "../../components/Skeletons/CardSkeleton/CardSkeleton";
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
    <div className="min-h-screen mx-auto mb-10 px-4 xl:px-0">
      <Helmet>
        <title>All Blogs | MetaBlog</title>
      </Helmet>
      <div className=" justify-center md:justify-between items-center  my-10 text-center flex flex-col gap-5 md:flex-row">
        <div className="dropdown dropdown-end relative">
          <input
            type="text"
            placeholder="Search Title"
            className="border px-3 py-1 bg-[#F4F4F5] dark:text-[#A1A1AA] dark:bg-[#242535] dark:border-none rounded-md w-full max-w-xs"
            onChange={(e) => {
              const search = e.target.value;
              const searchLower = search.toLowerCase();
              setQuery(searchLower);
            }}
          />
          <TfiSearch className="absolute dark:text-[#52525B] bottom-2 right-2 cursor-pointer overflow-hidden" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className=" border px-3 py-1 bg-[#F4F4F5] dark:text-[#A1A1AA] dark:bg-[#242535] dark:border-none rounded-md max-w-xs"
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
         <CardSkeleton/>
        ) : (
          <div className="flex justify-center">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
              {filteredBlogs.map((blog) => (
                <RecentBlogCard
                  key={blog._id}
                  isLoaded={isLoaded}
                  blog={blog}
                ></RecentBlogCard>
              ))}
            </div>
          </div>
        )}
      </ChakraProvider>
    </div>
  );
};

export default AllBlog;
