
import { useContext } from "react";
import { Helmet } from "react-helmet";
import "react-loading-skeleton/dist/skeleton.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import TimeFormat from "../../function/TimeFormat";
import Comment from "./Comments/Comment";

import { Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Container/Container";

const { Text } = Typography;
const { Title } = Typography;

const BlogDetail = () => {
  const { user } = useContext(AuthContext);
  // const axiosPublic = useAxiosSecure();
  const axiosSecure = useAxiosSecure();

  const params = useParams();

  const { data = [] } = useQuery({
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
    shortDescription,
    longDescription,
    authorImg,
    authorName,
    published,
    authorEmail,
  } = data;

  const formattedTime = TimeFormat(published);
  console.log(published);

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
  // console.log(filteredComments)

  return (
    <Container>
      <div className=" mb-10">
      <div className=" mt-10 p-2 lg:p-10">
        <Helmet>
          <title>MetaBlog | Details</title>
        </Helmet>

        <Typography>
          {title ? (
            <Title
              className="font-bold p-2 lg:p-0 dark:text-white lg:mt-8 text-center"
              level={2}
            >
              {title}
            </Title>
          ) : (
            <Skeleton count={2}></Skeleton>
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
                <img className="hover:cursor-zoom-in w-full max-h-[500px]" src={photoUrl} alt="" />
              </PhotoView>
            </PhotoProvider>
            <Paragraph className="mt-5 text-lg font-semibold dark:text-[#BABABF]">
              {shortDescription ? shortDescription : <Skeleton></Skeleton>}
            </Paragraph>
          </div>
          <Paragraph className=" text-base mt-10 font-medium mb-10 dark:text-[#BABABF]">
            {longDescription || <Skeleton></Skeleton>}
          </Paragraph>
          <div className="mb-10 text-center">
            {authorEmail === user?.email && (
              <Link to={`/update/${_id}`}>
                <button className="btn">Update</button>
              </Link>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-5">Comments :</h1>
          <div className="bg-blue-400">
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
                  <form className="pt-5 pl-10" onSubmit={handleAddComment}>
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
        </Typography>
      </div>
    </div>
    </Container>
  );
};

export default BlogDetail;
