import { FC } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import CardSkeleton from "../../components/Skeletons/CardSkeleton/CardSkeleton";
import Container from "../../components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

// import required modules
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

import FsSkeleton from "../../components/Skeletons/FeaturedSliderSkeleton/FsSkeleton";
import BlogCard from "../../components/BlogCard/BlogCard";
import { BlogsProps } from "../../api/useBlogData";
import useAllBlogs from "../../hooks/useAllBlogs";
import BlogSlider from "../../components/BlogSlider/BlogSlider";

const AllBlog: FC = (): JSX.Element => {
  const { allBlogs, isLoading, isLoaded, handleChange, category, data } =
    useAllBlogs();

  return (
    <Container>
      <div className="min-h-screen mx-auto mb-10 px-4 xl:px-0">
        <Helmet>
          <title>All Blogs | MetaBlog</title>
        </Helmet>
        {/* slider section of recent blogs //! will add featured blogs here */}
        <BlogSlider data={data} isLoading={isLoading} />

        <div className="justify-center md:justify-between items-center  my-10 text-center flex flex-col gap-5 md:flex-row">
          <select
            value={category || "default"}
            onChange={(e) => handleChange(e)}
            className=" border px-3 py-1 bg-[#F4F4F5] dark:text-[#A1A1AA] dark:bg-[#242535] dark:border-none rounded-md max-w-xs"
          >
            <option value="">All Categories</option>
            <option value="Lifestyle">Life Style</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Business">Business</option>
            <option value="Economy">Economy</option>
            <option value="Sports">Sports</option>
          </select>
          B
        </div>

        <ChakraProvider>
          {isLoaded ? (
            <CardSkeleton />
          ) : (
            <div className="flex justify-center">
              {allBlogs?.length > 0 ? (
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                  {allBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog}></BlogCard>
                  ))}
                </div>
              ) : (
                <h1 className="text-3xl dark:text-white font-semibold text-center">
                  No Blogs Found
                </h1>
              )}
            </div>
          )}
        </ChakraProvider>
      </div>
    </Container>
  );
};

export default AllBlog;
