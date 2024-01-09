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
    <div>
      <Helmet>
        <title>MetaBlog | Featured Blog</title>
      </Helmet>
      <div className="w-3/4 my-20 mx-auto">
        <DataTable responsive columns={columns} data={topBlogs} />
      </div>
    </div>
  );
};

export default FeaturedBlog;
