
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import TimeFormat from "../../function/TimeFormat";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const RecentBlogSlider = ({blog}) => {
    const {user} = useContext(AuthContext);
    const { _id, title, photoUrl, shortDescription, category, published } = blog;
    const formattedTime = TimeFormat(published);
    const handleWishlist = () => {
        const email = user?.email;
        // Each blog should have a title, image, short description, category, details button and
        // remove wishlist button
        const data = {
          blog_id: _id,
          title,
          photoUrl,
          shortDescription,
          category,
          email,
        };
    console.log(data)
       if(user){
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
       }else{
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
        <img src={blog.photoUrl} alt="" />
      </div>
      <h2 className="text-xl mb-2 p-4 md:p-0 text-center ">{blog.title}</h2>
      <p className="mb-4 text-center">Category : {blog.category}</p>
      <p className="text-sm  px-14">{blog.shortDescription}</p>
      <p className="mt-5 text-sm text-center">Published On : {formattedTime}</p>
      <div className=" flex text-center gap-5 mt-8 justify-center">
      <Link to={`/all/${_id}`}>
          <Button size="small">Details</Button>
        </Link>
        <Button size="small"onClick={()=>handleWishlist()}>Wishlist</Button>
      </div>
   </div>
  
    );
};

export default RecentBlogSlider;