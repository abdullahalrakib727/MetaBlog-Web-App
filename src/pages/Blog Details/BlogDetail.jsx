import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "react-loading-skeleton/dist/skeleton.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import TimeFormat from "../../function/TimeFormat";
import Comment from "./Comments/Comment";

import { Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const { Text } = Typography;
const { Title } = Typography;
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const BlogDetail = () => {
  const { user } = useContext(AuthContext);

  const data = useLoaderData();
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

  //  add a comment

  const handleAddComment = (e) => {
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
      console.log(comment);
      fetch("http://localhost:5000/comments", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(commentData),
      })
        .then((res) => res.json())
        .then(() => {
          form.reset();
          fetchComments();
        });
    }
  };

  //  show comment on site

  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    fetch(`http://localhost:5000/comments?blog_id=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments
    .filter((comment) => comment.blog_id == _id)
    .sort((a, b) => new Date(b.published) - new Date(a.published));
  // console.log(filteredComments)

  return (
    <div className="container mx-auto mb-10">
      <Helmet>
        <title>Blog-Zone || Details</title>
      </Helmet>
      
      <Typography>
        {title ? (
          <Title className="font-bold p-2 lg:p-0 mt-5 lg:mt-8" level={1}>
            {title}
          </Title>
        ) : (
          <Skeleton count={2}></Skeleton>
        )}

        <div className=" mb-10 px-2">
          <PhotoProvider className="px-2 lg:px-0">
            <PhotoView src={photoUrl}>
              <img src={photoUrl} alt="" />
            </PhotoView>
          </PhotoProvider>
          <Paragraph className="mt-5 text-xl mb-5 p-2 lg:p-0">
            {shortDescription ? shortDescription : <Skeleton></Skeleton>}
          </Paragraph>
        </div>
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="p-5 flex gap-5 items-center">
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
        <Paragraph className=" text-base p-2 md:p-5 font-medium mb-10">
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
              { authorEmail === user?.email ? <p className="bg-white text-center text-red-500 pb-5 font-semibold text-lg" type="warning">Can not comment to your own blog</p> : <form className="pt-5 pl-10" onSubmit={handleAddComment}>
                  <textarea
                    name="comment"
                    className="textarea textarea-info"
                    placeholder="Add a comment"
                  ></textarea>
                  <br />
                  <Button type="submit" variant="contained">
                    Comment
                  </Button>
                </form> }
            </div>
          )}
          <div className="pb-5 pt-5">
            {filteredComments.map((c) => (
              <Comment key={c._id} c={c}></Comment>
            ))}
          </div>
        </div>
      </Typography>
    </div>
  );
};

export default BlogDetail;
