import { FC } from "react";
import useRecentBlogs from "../../api/useRecentBlogs";
import BlogCard from "../../components/BlogCard/BlogCard";
import CardSkeleton from "../../components/Skeletons/CardSkeleton/CardSkeleton";

import { ChakraProvider } from "@chakra-ui/react";

const RecentBlog: FC = (): JSX.Element => {
  const { data, isLoading } = useRecentBlogs();
  return (
    <ChakraProvider>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          <h3 className="text-2xl px-4 xl:px-0 font-bold my-5 dark:text-white ">
            Latest Post
          </h3>
          <div className="flex justify-center px-4 xl:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
              {data.map((blog) => (
                <BlogCard key={blog._id} blog={blog}></BlogCard>
              ))}
            </div>
          </div>
        </>
      )}
    </ChakraProvider>
  );
};

export default RecentBlog;
