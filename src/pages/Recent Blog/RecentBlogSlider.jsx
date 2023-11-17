import { Button } from "@mui/material";
import { useContext } from "react";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import TimeFormat from "../../function/TimeFormat";

import "aos/dist/aos.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

const RecentBlogSlider = ({ blog }) => {
  const { user } = useContext(AuthContext);
  const { _id, title, photoUrl, shortDescription, category, published } = blog;
  const formattedTime = TimeFormat(published);
  const handleWishlist = () => {
    const email = user?.email;

    const data = {
      blog_id: _id,
      title,
      photoUrl,
      shortDescription,
      category,
      email,
    };

    if (user) {
      fetch("http://localhost:5000/wishlist", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          if (data.insertedId) {
            Swal.fire({
              title: "Added to Wishlist!",
              icon: "success",
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Log in first !",
        text: "You need to log in to add this to your wishlist",
        icon: "error",
      });
    }
  };

  return (
    <div className="border px-4 py-4">
      <div className="w-1/2 mx-auto mb-2">
        <PhotoProvider>
          <PhotoView src={photoUrl}>
            <img src={photoUrl} alt="" />
          </PhotoView>
        </PhotoProvider>
      </div>
      <h2 className="text-xl mb-2 p-4 md:p-0 text-center font-bold ">
        {title}
      </h2>
      <p className="mb-4 text-center font-semibold">
        Category : {category}
      </p>
      <p className="text-sm  px-14">{shortDescription}</p>
      <p className="mt-5 text-sm text-center">Published On : {formattedTime}</p>
      <div className=" flex text-center gap-5 mt-8 justify-center">
        <Link to={`/all/${_id}`}>
          <Button size="small">Details</Button>
        </Link>
        <Button size="small" onClick={() => handleWishlist()}>
          Wishlist
        </Button>
      </div>
    </div>
  );
};

export default RecentBlogSlider;
