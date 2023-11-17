import { useEffect, useState } from "react";

const useBlogData = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/all")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setIsLoaded(false);
      });
  }, []);

  const recentBlogs = blogs.sort(
    (a, b) => new Date(b.published) - new Date(a.published)
  );

  const limitedBlogs = recentBlogs.slice(0, 6);
  return [blogs, isLoaded, limitedBlogs];
};

export default useBlogData;
