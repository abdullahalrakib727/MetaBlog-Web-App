import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const { _id, title, photoUrl, shortDescription, category } = blog;

  return (
    <Card>
      <CardMedia
        component="img"
        alt={`image of ${title}`}
        height="140"
        image={photoUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <div className="font-bold">{title}</div>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortDescription}
        </Typography>
        <p className="mt-4 font-semibold">
          <span className="text-white p-2 bg-[#1976D2]">Category : {category}</span>
        </p>
      </CardContent>
      <CardActions className="flex justify-around">
        <Link to={`/all/${_id}`}>
          <Button size="small">Details</Button>
        </Link>
        <Button size="small">Wishlist</Button>
      </CardActions>
    </Card>
  );
};

export default Blog;
