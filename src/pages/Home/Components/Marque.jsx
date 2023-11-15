import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import LimitedBlog from "../../../function/LimitedBlog";

const Marque = () => {
  const limitedBlogs = LimitedBlog();
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
