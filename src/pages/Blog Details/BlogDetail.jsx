import { Button } from "@mui/material";
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
import axios from "axios";


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
      const res = await axiosSecure.get(
        `/all/${params.id}`,
       
      );
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

  //  show comment on site
  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://blog-website-server-theta.vercel.app/comments?blog_id=${_id}`,
        {withCredentials:true}
      );
      return res.data;
    },
  });

  //  add a comment

  const handleAddComment = async(e) => {
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
    
      const url = "https://blog-website-server-theta.vercel.app/comments";

     const res = await  axios.post(url,commentData,{withCredentials:true})
      if(res.data.insertedId){
        form.reset();
          refetch();
      }

      // fetch("https://blog-website-server-theta.vercel.app/comments", {
      //   method: "post",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(commentData),
      // })
      //   .then((res) => res.json())
      //   .then(() => {
      //     form.reset();
      //     refetch();
      //   });
    }
  };

  const filteredComments = comments
    .filter((comment) => comment.blog_id == _id)
    .sort((a, b) => new Date(b.published) - new Date(a.published));
  // console.log(filteredComments)

  return (
    <div className="container mx-auto mb-10">
      <div className="max-w-5xl mx-auto shadow-xl bg-white mt-10 p-2 lg:p-10">
        <Helmet>
          <title>Blog-Zone || Details</title>
        </Helmet>

        <Typography>
          {title ? (
            <Title
              className="font-bold p-2 lg:p-0 lg:mt-8 text-center"
              level={2}
            >
              {title}
            </Title>
          ) : (
            <Skeleton count={2}></Skeleton>
          )}

          <div className=" mb-10 px-2">
            <PhotoProvider className="px-2 lg:px-0">
              <PhotoView src={photoUrl}>
                <img className="hover:cursor-zoom-in" src={photoUrl} alt="" />
              </PhotoView>
            </PhotoProvider>
            <Paragraph className="mt-5 text-lg font-semibold ">
              {shortDescription ? shortDescription : <Skeleton></Skeleton>}
            </Paragraph>
          </div>
          <div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="p-1 flex gap-5 items-center">
                <Text className="text-base" code>
                  Author:
                </Text>
                <div className="flex justify-center gap-2 items-center">
                  <img src={authorImg} alt="" className="w-10" />
                  <Text strong className="text-lg">
                    {authorName}
                  </Text>
                </div>
              </div>
              {formattedTime ? (
                <Text keyboard>Published on: {formattedTime}</Text>
              ) : (
                <Skeleton></Skeleton>
              )}
            </div>
          </div>
          <Paragraph className=" text-base mt-10 font-medium mb-10">
            {longDescription || <Skeleton></Skeleton>}
          </Paragraph>
          <div className="mb-10 text-center">
            {authorEmail === user?.email && (
              <Link to={`/update/${_id}`}>
                <Button variant="contained">Update</Button>
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
                    <Button type="submit" variant="contained">
                      Comment
                    </Button>
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
  );
};

export default BlogDetail;
