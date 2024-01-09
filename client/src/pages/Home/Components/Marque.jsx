import { ChakraProvider, Skeleton, Stack } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import useBlogData from "../../../hooks/useBlogData";

const Marque = () => {
  const [recentBlogs, isLoaded] = useBlogData();
  const limitedBlogs = recentBlogs.slice(0, 6);
  return (
    <ChakraProvider>
      <Stack>
        {isLoaded ? (
          <Skeleton height="40px" />
        ) : (
          <Marquee pauseOnHover>
            {limitedBlogs.map((blog) => (
              <div key={blog._id}>
                <Link to={`/all/${blog._id}`}>
                  <h2 className="mr-10 font-semibold text-2xl">{blog.title}</h2>
                </Link>
              </div>
            ))}
          </Marquee>
        )}
      </Stack>
    </ChakraProvider>
  );
};

export default Marque;
