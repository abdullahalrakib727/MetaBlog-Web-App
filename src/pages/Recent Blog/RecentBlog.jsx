
import useBlogData from "../../hooks/useBlogData";

import RecentBlogSlider from "./RecentBlogSlider";

const RecentBlog = () => {
  const [limitedBlogs] = useBlogData("all");

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {limitedBlogs.map((blog) => (
        <RecentBlogSlider key={blog._id} blog={blog}></RecentBlogSlider>
      ))}
    </div>
  );
};

export default RecentBlog;
