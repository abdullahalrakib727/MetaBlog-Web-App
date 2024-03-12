import { FC } from "react";
import { Helmet } from "react-helmet";

import NotVerified from "../../components/NotVerified/NotVerified";

import useAddBlog from "../../hooks/useAddBlog";
import BlogFrom from "../../components/BlogForm/BlogForm";


const AddBlog: FC = (): JSX.Element => {
  const { user, content, setContent, handleSubmit, register, errors, onSubmit, loading} =
    useAddBlog();

  //? if user is not verified

  if (user?.emailVerified === false) {
    return (
      <>
        <NotVerified />
      </>
    );
  }

  //? if user is verified

  return (
    <div className="my-10">
      <Helmet>
        <title>Add Blog | MetaBlog</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <div className="card w-full shadow-xl">
          <h1 className="dark:text-white text-center text-2xl font-semibold">
            Write a blog from here
          </h1>
          <BlogFrom
            buttonText="Add Blog"
            content={content}
            setContent={setContent}
            handleSubmit={handleSubmit}
           Submit={onSubmit}
            register={register}
            errors={errors}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
