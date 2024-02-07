import { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import useBlogData from "../../hooks/useBlogData";

import RecentBlogCard from "../Recent Blog/RecentBlogCard";
import CardSkeleton from "../../components/Skeletons/CardSkeleton/CardSkeleton";
import Container from "../../components/Container/Container";

import useRecentBlogs from "../../api/useRecentBlogs";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

// import required modules
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const AllBlog = () => {
  const [blogs, isLoaded] = useBlogData();
  const [selectedCategory, setSelectedCategory] = useState("");

  const recentBlogs = blogs.sort(
    (a, b) => new Date(a.published) - new Date(b.published)
  );

  const filteredBlogs = recentBlogs.filter(
    (blog) => selectedCategory === "" || blog.category === selectedCategory
  );

  const { data, isLoading } = useRecentBlogs();

  // ? can show featured blogs instead of recent blogs here on slider later

  return (
    <Container>
      <div className="min-h-screen mx-auto mb-10 px-4 xl:px-0">
        <Helmet>
          <title>All Blogs | MetaBlog</title>
        </Helmet>

        <section>
          <Swiper
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {data.map((blog) => (
              <SwiperSlide key={blog._id}>
                <Link to={`/all/${blog._id}`}>
                  <section className="max-w-[1216px] overflow-hidden">
                    <div
                      style={{
                        backgroundImage: `url(${blog.photoUrl})`,
                      }}
                      className=" h-[450px] my-12 rounded-xl flex bg-cover bg-no-repeat max-w-[1216px]"
                    >
                      {/* details */}
                      <div className="p-10 self-end">
                        <p className="text-white bg-[#4B6BFB] inline-block py-1 px-[10px] rounded-md text-sm font-medium mb-4">
                          {blog.category}
                        </p>
                        <h2 className="text-white text-3xl font-semibold max-w-[720px]">
                          {blog.title}
                        </h2>
                        <div className="text-white flex items-center gap-5 mt-6">
                          <img
                            src={blog.authorImg}
                            alt="author-image"
                            className="max-w-[36px] max-h-[36px] rounded-full"
                          />
                          <h6 className="font-medium text-base">
                            {blog.authorName}
                          </h6>
                          <p className="text-base font-normal">
                            {blog.published && !isNaN(new Date(blog.published))
                              ? format(
                                  parseISO(blog.published),
                                  "MMMM dd, yyyy"
                                )
                              : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <div className="justify-center md:justify-between items-center  my-10 text-center flex flex-col gap-5 md:flex-row">
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
            <CardSkeleton />
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
    </Container>
  );
};

export default AllBlog;
