import { FC, useEffect, useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import CardSkeleton from "../../components/Skeletons/CardSkeleton/CardSkeleton";
import Container from "../../components/Container/Container";

import useRecentBlogs from "../../api/useRecentBlogs";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

// import required modules
import { Autoplay } from "swiper/modules";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../api/useAxiosPublic";
import FsSkeleton from "../../components/Skeletons/FeaturedSliderSkeleton/FsSkeleton";
import BlogCard from "../../components/BlogCard/BlogCard";
import { BlogsProps } from "../../api/useBlogData";

const AllBlog: FC = (): JSX.Element => {
  // hooks

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  // data fetching

  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useRecentBlogs();

  const {
    data: allBlogs = [],
    refetch,
    isLoading: isLoaded,
  } = useQuery<BlogsProps[],unknown>({
    queryKey: ["all-blogs", selectedCategory],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs${selectedCategory}`);
      return res.data.data;
    },
  });

  // hooks

  useEffect(() => {
    if (category) {
      setSelectedCategory(`?category=${category}`);
    }
  }, [category]);

  useEffect(() => {
    refetch();
  }, [selectedCategory, refetch]);

  // functions

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setSelectedCategory("");
      navigate("/blogs");
      return;
    } else {
      setSelectedCategory("?category=" + e.target.value);
      navigate(`/blogs?category=${e.target.value}`);
    }
  };

  // ? can show featured blogs instead of recent blogs here on slider later

  return (
    <Container>
      <div className="min-h-screen mx-auto mb-10 px-4 xl:px-0">
        <Helmet>
          <title>All Blogs | MetaBlog</title>
        </Helmet>
        {/* slider section of recent blogs //! will add featured blogs here */}
        <section>
          {isLoading ? (
            <FsSkeleton />
          ) : (
            <Swiper
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {data.map((blog: BlogsProps) => (
                <SwiperSlide key={blog._id} style={{ borderRadius: "12px" }}>
                  <Link to={`/blogs/${blog._id}`}>
                    <div className="max-w-[1216px] overflow-hidden rounded-xl">
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
                              {blog.published &&
                              !isNaN(Date.parse(blog.published))
                                ? format(
                                    parseISO(blog.published),
                                    "MMMM dd, yyyy"
                                  )
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>

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
