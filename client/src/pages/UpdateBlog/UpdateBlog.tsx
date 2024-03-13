import { Helmet } from "react-helmet";

import { FC } from "react";

import useUpdateBlog from "../../hooks/useUpdateBlog";
import BlogFrom from "../../components/BlogForm/BlogForm";

const UpdateBlog: FC = (): JSX.Element => {
  const {
    item,
    updatedContent,
    setUpdatedContent,
    errors,
    handleSubmit,
    loading,
    onSubmit,
    register,
  } = useUpdateBlog();

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
            handleSubmit={handleSubmit}
            setContent={setUpdatedContent}
            loading={loading}
            Submit={onSubmit}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
