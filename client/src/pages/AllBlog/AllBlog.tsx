import { FC } from "react";
import { Helmet } from "react-helmet";
import Container from "../../components/Container/Container";
import useAllBlogs from "../../hooks/useAllBlogs";
import BlogSlider from "../../components/BlogSlider/BlogSlider";
import CategorySelect from "../../components/CategorySelect/CategorySelect";
import Blogs from "../../components/Blogs/Blogs";

const AllBlog: FC = (): JSX.Element => {
  const {
    allBlogs,
    isLoading,
    loading,
    handleChange,
    category,
    data,
    pages,
    handlePageChange,
  } = useAllBlogs();

  const categoryList = [
    { value: "all", label: "All Categories" },
    { value: "lifestyle", label: "Life Style" },
    { value: "technology", label: "Technology" },
    { value: "travel", label: "Travel" },
    { value: "business", label: "Business" },
    { value: "economy", label: "Economy" },
    { value: "sports", label: "Sports" },
  ];

  const totalPages = [...Array(pages).keys()];

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
      <div className="join flex justify-center items-center m-auto fixed bottom-2 left-0 w-full">
        {totalPages.map((i) => (
          <button
            onClick={() => handlePageChange(i + 1)}
            className={`join-item btn dark:bg-[#242535] dark:text-white `}
            key={i}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </Container>
  );
};

export default AllBlog;
