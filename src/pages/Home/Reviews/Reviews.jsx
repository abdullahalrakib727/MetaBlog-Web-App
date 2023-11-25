import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "swiper/css";

// must import autoplay css

import "swiper/css/autoplay";

import "swiper/css/navigation";

// must import autoplay from modules

import { Autoplay } from "swiper/modules";

const Reviews = () => {
  const blogReviews = [
    {
      username: "MovieBuff21",
      category: "Entertainment",
      title: "Unveiling the Epic Tale: Attack on Titan",
      content: "As an anime lover I loved the details author has provided'",
    },
    {
      username: "FantasyReader87",
      category: "Entertainment",
      title: "Erased: A Time-Bending Tale of Redemption and Mystery",
      content:
        "I completely lost the track of time while watching this series.",
    },
    {
      username: "FitFreak123",
      category: "Health",
      title: "Harmony Within: The Transformative Power of Yoga",
      content: "Everyone should do some yoga!",
    },
    {
      username: "HealthyEatsDaily",
      category: "Health",
      title:
        "Navigating the Mind: A Compassionate Journey Through Mental Health",
      content: "Mental Health is essential",
    },
    {
      username: "FoodieExplorer",
      category: "Food",
      title:
        "Savoring the Art of Kebabs: A Culinary Journey of Grilled Delight",
      content: "I love kebab 🤤",
    },
    {
      username: "TechEnthusiast22",
      category: "Tech",
      title:
        "Beyond Boundaries: Exploring the Frontiers of Artificial Intelligence",
      content: "Ai is becoming powerful everyday!",
    },
    {
      username: "ProductivityWizard",
      category: "Tech",
      title:
        "Unveiling the Power of Data Science: Navigating the Digital Frontier",
      content: "A must read blog",
    },
  ];

  return (
    <div className="mt-10">
      <Swiper
        autoplay={true}
       
        modules={[ Autoplay]}
        className="mySwiper"
      >
        {blogReviews.map((review) => (
          <SwiperSlide key={review.username}><div className="text-center">
            <h1 className="text-2xl text-green-500">Title: <span className=" font-semibold">{review.title}</span></h1>
            <h4 className="text-xl text-blue-400">Category: {review.category}</h4>
            <p className="text-base font-semibold text-violet-700">Reviewer: <span className="text-red-500">{review.username}</span></p>
            <p className="text-md font-bold">Views on the blog : <span className="text-indigo-600">{review.content}</span></p>
            </div></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
