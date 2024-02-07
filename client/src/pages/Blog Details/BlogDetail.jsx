import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import "react-loading-skeleton/dist/skeleton.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

import Comment from "./Comments/Comment";

import { Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Container/Container";
import HTMLReactParser from "html-react-parser";
import { format } from "date-fns";

const { Text } = Typography;
const { Title } = Typography;

const BlogDetail = () => {
  const { user } = useContext(AuthContext);
  // const axiosPublic = useAxiosSecure();
  const axiosSecure = useAxiosSecure();

  const params = useParams();

  const { data = [], isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all/${params.id}`);
      return res.data;
    },
  });
  const {
    _id,
    title,
    photoUrl,
    authorImg,
    authorName,
    published,
    authorEmail,
    content,
  } = data;

  const applyDarkMode = (tagName, className) => {
    const elements = document.getElementsByTagName(tagName);
    const elementsArray = Array.from(elements);
    elementsArray.forEach((element) => {
      element.classList.add(className);
    });
  };

  useEffect(() => {
    applyDarkMode("strong", "dark:text-white");
    applyDarkMode("h1", "dark:text-white");
    applyDarkMode("h2", "dark:text-white");
    applyDarkMode("h3", "dark:text-white");
    applyDarkMode("h4", "dark:text-white");
    applyDarkMode("h5", "dark:text-white");
    applyDarkMode("h6", "dark:text-white");
    applyDarkMode("p", "dark:text-[#BABABF]");
    applyDarkMode("a", "dark:text-white");
    applyDarkMode("span", "dark:text-white");
  }, [content]);

  const formattedTime = published
    ? format(new Date(published), "yyyy-MM-dd HH:mm")
    : null;

  //  show comment on site
  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://blog-website-server-theta.vercel.app/comments?blog_id=${_id}`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  //  add a comment

  const handleAddComment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const commenter = user?.displayName;
    const commenterImg = user?.photoURL;
    const commenterEmail = user?.email;
    const comment = e.target.comment.value;
    const published = new Date();
    if (comment) {
      const commentData = {
        blog_id: _id,
        parent_id: null,
        commenter,
        commenterImg,
        comment,
        commenterEmail,
        published,
      };

      const res = await axiosSecure.post("/comments", commentData);
      if (res.data.insertedId) {
        form.reset();
        refetch();
      }
    }
  };

  const filteredComments = comments
    .filter((comment) => comment.blog_id == _id)
    .sort((a, b) => new Date(b.published) - new Date(a.published));

  return (
    <Container>
      <div className=" mb-10">
        <div className=" mt-10 p-2 lg:p-10">
          <Helmet>
            <title>Details | MetaBlog</title>
          </Helmet>

          <Typography>
            {isLoading ? (
              <Skeleton count={2}></Skeleton>
            ) : (
              <Title
                className="font-bold p-2 lg:p-0 dark:text-white lg:mt-8 text-center"
                level={2}
              >
                {title}
              </Title>
            )}
            <div className="flex flex-col md:flex-row  items-center gap-5 my-5 ">
              <div className="p-1 ">
                <div className="flex justify-center gap-2 items-center">
                  <img src={authorImg} alt="" className="w-10 rounded-full" />
                  <Text strong className="text-lg dark:text-[#696A75]">
                    {authorName}
                  </Text>
                </div>
              </div>
              {formattedTime ? (
                <div className="dark:text-[#696A75]">{formattedTime}</div>
              ) : (
                <Skeleton></Skeleton>
              )}
            </div>

            <div className=" mb-10 px-2 w-full">
              <PhotoProvider className="px-2 lg:px-0">
                <PhotoView src={photoUrl}>
                  <img
                    className="hover:cursor-zoom-in w-full max-h-[500px]"
                    src={photoUrl}
                    alt="Thumbnail"
                  />
                </PhotoView>
              </PhotoProvider>
            </div>
            {data?.content && (
              <div className="mb-10 overflow-auto dark:bg-[#181A2A]">
                {HTMLReactParser(
                  `<div class="dark:bg-[#181A2A] overflow-auto dark:text-white">${content}</div>`
                )}
              </div>
            )}
            <div className="mb-10 text-center">
              {authorEmail === user?.email && (
                <Link to={`/update/${_id}`}>
                  <button className=" py-2 px-4 text-center rounded-md bg-black text-white  normal-case hover:bg-green-500 transition-all duration-300 shadow-md">
                    Update
                  </button>
                </Link>
              )}
            </div>

            {/* comment section */}
            <section>
              <p className="text-xl font-semibold dark:text-white">
                Comments :
              </p>

              {filteredComments.length > 0 && (
                <div className="bg-[#F6F6F7]">
                  {user && (
                    <div className="">
                      {authorEmail === user?.email ? (
                        <p
                          className="bg-white text-center text-red-500 pb-5 font-semibold text-lg"
                          type="warning"
                        >
                          Can not comment to your own blog
                        </p>
                      ) : (
                        <form
                          className="pt-5 pl-10"
                          onSubmit={handleAddComment}
                        >
                          <textarea
                            name="comment"
                            className="textarea textarea-info"
                            placeholder="Add a comment"
                          ></textarea>
                          <br />
                          <button className="btn">Comment</button>
                        </form>
                      )}
                    </div>
                  )}
                  <div className="pb-5 pt-5">
                    {filteredComments.map((c) => (
                      <Comment refetch={refetch} key={c._id} c={c}></Comment>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default BlogDetail;
