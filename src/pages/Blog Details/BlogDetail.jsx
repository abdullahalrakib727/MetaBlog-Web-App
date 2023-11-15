import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import TimeFormat from "../../function/TimeFormat";
import Comment from "./Comments/Comment";

const BlogDetail = () => {
  const { user } = useContext(AuthContext);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  }
    scrollToTop();

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

      {title ? (
        <h2 className="text-center mt-10 mb-7 lg:mb-20 text-3xl lg:text-6xl font-bold">
          {" "}
          {title}
        </h2>
      ) : (
        <Skeleton count={2}></Skeleton>
      )}

      <div className="flex flex-col mb-10 3xl:flex-row gap-5 items-center">
        <img src={photoUrl ? photoUrl : <Skeleton></Skeleton>} alt="" />
        <p className="font-semibold p-2 md:p-5 text-xl md:text-3xl">
          {shortDescription ? shortDescription : <Skeleton></Skeleton>}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="p-5 flex gap-5 items-center">
          <p className="text-2xl font-medium">Published By: </p>
          <div className="flex items-center gap-2">
            <div className="avatar ">
              <div className="bg-neutral text-neutral-content rounded-full w-12">
                <img
                  src={authorImg ? authorImg : <Skeleton></Skeleton>}
                  alt=""
                />
              </div>
            </div>
            <p className="text-xl font-medium">
              {authorName ? authorName : <Skeleton></Skeleton>}
            </p>
          </div>
        </div>
        {formattedTime ? (
          <p className="font-medium mb-5 p-5">Published on: {formattedTime}</p>
        ) : (
          <Skeleton></Skeleton>
        )}
      </div>
      <p className="md:text-2xl p-2 md:p-5 font-medium mb-10">
        {longDescription || <Skeleton></Skeleton>}
      </p>
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
            {authorEmail !== user?.email && (
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
            <Comment key={c._id} c={c}></Comment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
