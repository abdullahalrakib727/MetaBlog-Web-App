import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../../components/Skeletons/CardSkeleton/CardSkeleton";

import RecentBlogCard from "./RecentBlogCard";
import { ChakraProvider } from "@chakra-ui/react";

import useAxiosPublic from "../../hooks/useAxiosPublic";

const RecentBlog = () => {
  const axiosPublic = useAxiosPublic();

  const { data = [], isLoading } = useQuery({
    queryKey: ["recentBlogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs?recent=true");
      return res.data.data;
    },
  });

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
                <RecentBlogCard key={blog._id} blog={blog}></RecentBlogCard>
              ))}
            </div>
          </div>
        </>
      )}
    </ChakraProvider>
  );
};

export default RecentBlog;
