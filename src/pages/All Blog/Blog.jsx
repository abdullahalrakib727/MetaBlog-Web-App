import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const Blog = ({ blog }) => {
  const { user } = useContext(AuthContext);
  const { _id, title, photoUrl, shortDescription, category } = blog;

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
    <Card>
      {photoUrl ? <img src={photoUrl} className="p-2" alt="" /> : <Skeleton />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <div className="font-bold">{title || <Skeleton></Skeleton>}</div>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortDescription || <Skeleton></Skeleton>}
        </Typography>
        <p className="mt-4 font-semibold">
          <span className="text-white p-2 bg-[#1976D2]">
            Category : {category || <Skeleton></Skeleton>}
          </span>
        </p>
      </CardContent>
      <CardActions className="flex justify-around">
        <Link to={`/all/${_id}`}>
          <Button size="small">Details</Button>
        </Link>
        <Button onClick={() => handleWishlist()} size="small">
          Wishlist{" "}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Blog;
