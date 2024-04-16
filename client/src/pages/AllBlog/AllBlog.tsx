import { FC } from "react";
import { Helmet } from "react-helmet";
import Container from "../../components/Container/Container";
import useAllBlogs from "../../hooks/useAllBlogs";
import BlogSlider from "../../components/BlogSlider/BlogSlider";
import CategorySelect from "../../components/CategorySelect/CategorySelect";
import Blogs from "../../components/Blogs/Blogs";

const AllBlog: FC = (): JSX.Element => {
  const { allBlogs, isLoading, loading, handleChange, category, data } =
    useAllBlogs();

  const categoryList = [
    { value: "All", label: "All Categories" },
    { value: "Lifestyle", label: "Life Style" },
    { value: "Technology", label: "Technology" },
    { value: "Travel", label: "Travel" },
    { value: "Business", label: "Business" },
    { value: "Economy", label: "Economy" },
    { value: "Sports", label: "Sports" },
  ];

  return (
    <Container>
      <div className="min-h-screen mx-auto mb-10 px-4 xl:px-0">
        <Helmet>
          <title>All Blogs | MetaBlog</title>
        </Helmet>
        {/* //*slider section of recent blogs //! will add featured blogs here which will be selected  by admin */}
        <BlogSlider data={data} isLoading={isLoading} />
        <CategorySelect
          categoryList={categoryList}
          category={category}
          handleChange={handleChange}
        />
        <Blogs allBlogs={allBlogs} loading={loading} />
      </div>
    </Container>
  );
};

export default AllBlog;
