import DataTable from "react-data-table-component";
import { Helmet } from "react-helmet";
import useBlogData from "../../hooks/useBlogData";
const FeaturedBlog = () => {
  const [blogs] = useBlogData();

  const sortedBlog = blogs.sort(
    (a, b) => b.longDescription.length - a.longDescription.length
  );

  const topBlogs = sortedBlog.slice(0, 10);

  const columns = [
    {
      name: "Serial Number",
      cell: (row, index) => index + 1,
    },
    {
      name: "Blog Title",
      selector: (row) => row.title,
    },
    {
      name: "Blog Owner",
      selector: (row) => row.authorName,
    },
    {
      name: "Owner Profile pic",

      selector: (row) => (
        <img src={row.authorImg} width={50} height={50} alt="" />
      ),
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Blog-Zone || Featured Blog</title>
      </Helmet>
      <DataTable responsive columns={columns} data={topBlogs} />
    </div>
  );
};

export default FeaturedBlog;
