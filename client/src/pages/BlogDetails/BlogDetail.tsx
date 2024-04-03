import { FC } from "react";
import { Helmet } from "react-helmet";
import "react-loading-skeleton/dist/skeleton.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import HTMLReactParser from "html-react-parser";
import styles from "./BlogDetail.module.css";
import useBlogDetail from "../../hooks/useBlogDetail";
import useReaction from "../../hooks/useReaction";
import Reactions from "../../components/Reactions/Reactions";

const BlogDetail: FC = (): JSX.Element => {
  const {
    isLoading,
    handleDelete,
    publishDate,
    authorName,
    authorImg,
    title,
    photoUrl,
    content,
    authorId,
    _id,
    user,
    data,
    slug,
  } = useBlogDetail();

  const { like, disLike, handleLike, handleDisLike } = useReaction();

  if (isLoading) {
    return (
      <span className="loading loading-spinner min-h-screen flex justify-center items-center mx-auto loading-lg dark:text-white"></span>
    );
  }

  return (
    <Container>
      <Helmet>
        <title>Details | MetaBlog</title>
      </Helmet>
      <section className=" mb-10">
        <div className=" mt-10 p-2 lg:p-10">
          <article>
            <h2 className="font-semibold p-2 lg:p-0 dark:text-white lg:mt-8 text-center text-3xl">
              {title}
            </h2>
            <section className="flex justify-between items-center">
              <div className="flex flex-col md:flex-row  items-center gap-5 my-5 ">
                <div className="p-1 ">
                  <div className="flex justify-center gap-2 items-center">
                    <img
                      src={authorImg}
                      alt={"image of " + title}
                      className="w-10 object-cover h-10 rounded-full"
                    />
                    <p className="text-lg dark:text-[#696A75] font-bold">
                      {authorName}
                    </p>
                  </div>
                </div>
                <div className="dark:text-[#696A75]">{publishDate}</div>
              </div>
              <Reactions
                like={like}
                disLike={disLike}
                addLike={handleLike}
                addDisLike={handleDisLike}
              />
            </section>
            <div className=" mb-10 px-2 w-full">
              <PhotoProvider className="px-2 lg:px-0">
                <PhotoView src={photoUrl}>
                  <img
                    className="hover:cursor-zoom-in w-full max-h-[570px] object-cover"
                    src={photoUrl}
                    alt="Thumbnail"
                  />
                </PhotoView>
              </PhotoProvider>
            </div>
            {data?.content && (
              <div
                className={`${styles.blogDetail} mb-10 overflow-auto dark:bg-[#181A2A]`}
              >
                {HTMLReactParser(
                  `<div class="dark:bg-[#181A2A] overflow-auto dark:text-white">${content}</div>`
                )}
              </div>
            )}
            <div className="mb-10 text-center">
              {authorId === user?.uid && (
                <div className="flex gap-3 justify-center">
                  <Link to={`/update/${slug}`}>
                    <button className=" py-2 px-4 text-center rounded-md bg-black text-white  normal-case hover:bg-white hover:text-black transition-all duration-300 shadow-md">
                      Update
                    </button>
                  </Link>
                  <button
                    className=" py-2 px-4 text-center rounded-md bg-green-700 text-white  normal-case hover:bg-red-600 transition-all duration-300 shadow-md"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
    </Container>
  );
};

export default BlogDetail;
