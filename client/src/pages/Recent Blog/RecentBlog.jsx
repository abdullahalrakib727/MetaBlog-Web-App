import { Skeleton } from "@chakra-ui/skeleton";
import useBlogData from "../../hooks/useBlogData";
// import { ChakraProvider } from "@chakra-ui/react";
import RecentBlogCard from "./RecentBlogCard";


const RecentBlog = () => {
  const [, isLoaded, recentBlogs] = useBlogData();
  const limitedBlogs = recentBlogs.slice(0, 9);
  // console.log(limitedBlogs)

  return (
    <div>
      {isLoaded ? (
        <Skeleton height="300px"></Skeleton>
      ) : (
        <>
          <h3 className="text-2xl px-4 xl:px-0 font-bold my-5 dark:text-white ">Latest Post</h3>
          <div className="flex justify-center px-4 xl:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
              {limitedBlogs.map((blog) => (
                <RecentBlogCard
                  key={blog._id}
                  isLoaded={isLoaded}
                  blog={blog}
                ></RecentBlogCard>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentBlog;
