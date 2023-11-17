
import { useContext } from "react";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import TimeFormat from "../../function/TimeFormat";

import "aos/dist/aos.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Button } from "antd";
import { ButtonGroup, Card, CardBody, CardFooter,  Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";

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
  
  <Card maxW="sm" className=" shadow-lg">
      <CardBody>
        <PhotoProvider>
          <PhotoView src={photoUrl}>
            <Image src={photoUrl} alt="" />
          </PhotoView>
        </PhotoProvider>
        <Stack mt="6" spacing="3">
          <Heading className="text-2xl mb-3" size="md">
            {title}
          </Heading>
          <Text className="mb-3">{shortDescription}</Text>
          <Text color="blue.600" className="mb-2 " fontSize="2xl">
            Category: {category}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter className="mt-auto">
        <ButtonGroup spacing="2">
          <Link to={`/all/${_id}`}>
            <Button className="register-btn" colorScheme="blue">
              Details
            </Button>
          </Link>

          <Button
            onClick={() => handleWishlist()}
            variant="ghost"
            colorScheme="blue"
          >
            Wishlist
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default RecentBlogSlider;
