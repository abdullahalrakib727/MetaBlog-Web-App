
import Marquee from "react-fast-marquee";
import LimitedBlog from "../../../function/LimitedBlog";

const Marque = () => {
const limitedBlogs = LimitedBlog();
    return (
        <Marquee>
   {
    limitedBlogs.map(blog=><div key={blog._id}>
      <h2 className="mr-10 text-2xl">{blog.title}</h2>
    </div>)
   }
  </Marquee>
    );
};

export default Marque;