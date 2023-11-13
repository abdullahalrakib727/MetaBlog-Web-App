import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Comment from "./Comments/Comment";
import TimeFormat from "../../function/TimeFormat";

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

  
  const handleAddComment = (e) => {
    e.preventDefault();
    const form = e.target;
    const commenter = user?.displayName;
    const commenterImg = user?.photoURL;
    const commenterEmail = user?.email;
    const comment = e.target.comment.value;
    if (comment) {
      const commentData = {
        blog_id: _id,

        commenter,
        commenterImg,
        comment,
        commenterEmail,
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

  const filteredComments = comments.filter((comment) => comment.blog_id == _id);
  // console.log(filteredComments)

  return (
    <div className="container mx-auto mb-10">
      <Helmet>
        <title>Blog-Zone || Details</title>
      </Helmet>
      <h2 className="text-center mt-10 mb-7 lg:mb-20 text-3xl lg:text-6xl font-bold">
        {" "}
        "{title}"
      </h2>
      <div className="flex flex-col mb-10 3xl:flex-row gap-5 items-center">
        <img src={photoUrl} alt="" />
        <p className="font-semibold p-2 md:p-5 text-xl md:text-3xl">
          {shortDescription}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="p-5 flex gap-5 items-center">
          <p className="text-2xl font-medium">Author: </p>
          <div className="flex items-center gap-2">
            <div className="avatar ">
              <div className="bg-neutral text-neutral-content rounded-full w-12">
                <img src={authorImg} alt="" />
              </div>
            </div>
            <p className="text-xl font-medium">{authorName}</p>
          </div>
        </div>
        <p className="font-medium mb-5 p-5">Published on: {formattedTime}</p>
      </div>
      <p className="md:text-2xl p-2 md:p-5 font-medium mb-10">
        {longDescription}
      </p>
      <div className="mb-10 text-center">
        {authorEmail === user?.email && (
          <Link to={`/update/${_id}`}>
            <Button variant="contained">Update</Button>
          </Link>
        )}
      </div>
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
                <Button
                type="submit"
                  variant="contained"
                >
                  Comment
                </Button>
              </form>
            )}
          </div>
        )}
        <div className="grid pt-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredComments.map((c) => (
            <Comment key={c._id} c={c}></Comment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
