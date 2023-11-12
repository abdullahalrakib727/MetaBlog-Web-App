import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const { _id, title, photUrl, shortDescription, category } = blog;

  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={photUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortDescription}
        </Typography>
        <p>Category: {category}</p>
      </CardContent>
      <CardActions>
        <Link to={`/all/${_id}`}><Button size="small">Details</Button></Link>
        <Button size="small">Wishlist</Button>
      </CardActions>
    </Card>
  );
};

export default Blog;
