import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import useBlogData from "../../../hooks/useBlogData";

const Marque = () => {
  const [limitedBlogs, isLoaded] = useBlogData();
  return (
    <Marquee pauseOnHover>
      {limitedBlogs.map((blog) => (
        <div key={blog._id}>
          <Link to={`/all/${blog._id}`}>
            <h2 className="mr-10 text-2xl">{blog.title}</h2>
          </Link>
        </div>
      ))}
    </Marquee>
  );
};

export default Marque;
