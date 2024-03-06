import { Helmet } from "react-helmet";

import { FC } from "react";

import BlogFrom from "../../components/AddBlogForm/BlogForm";
import useUpdateBlog from "../../hooks/useUpdateBlog";

const UpdateBlog: FC = (): JSX.Element => {
  const {
    item,
    updatedContent,
    setUpdatedContent,
    isSubmitting,
    handleUpdate,
  } = useUpdateBlog();

  console.log(item.title);

  return (
    <div className="card w-full shadow-md min-h-screen my-10">
      <Helmet>
        <title>{`Update ${item?.title} | MetaBlog`}</title>
      </Helmet>

      <div className="min-h-screen flex justify-center flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Update: {item.title}
        </h1>
        <div>
          <BlogFrom
            item={item}
            buttonText="Update"
            content={updatedContent}
            handleSubmit={handleUpdate}
            setContent={setUpdatedContent}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
