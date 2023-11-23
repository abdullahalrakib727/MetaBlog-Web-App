

const Reviews = () => {
    const blogReviews = [
        {
          username: "MovieBuff21",
          category: "Entertainment",
          title: "'Unveiling the Epic Tale: Attack on Titan",
          content: "As an anime lover I loved the details author has provided'",
        },
        {
          username: "FantasyReader87",
          category: "Entertainment",
          title: "Erased: A Time-Bending Tale of Redemption and Mystery",
          content: "I completely lost the track of time while watching this series.",
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
          title: "Navigating the Mind: A Compassionate Journey Through Mental Health",
          content: "Mental Health is essential",
        },
        {
          username: "FoodieExplorer",
          category: "Food",
          title: "Savoring the Art of Kebabs: A Culinary Journey of Grilled Delight",
          content: "I love kebab 🤤",
        },
        {
          username: "TechEnthusiast22",
          category: "Tech",
          title: "Beyond Boundaries: Exploring the Frontiers of Artificial Intelligence",
          content: "Ai is becoming powerful everyday!",
        },
        {
          username: "ProductivityWizard",
          category: "Tech",
          title: "Unveiling the Power of Data Science: Navigating the Digital Frontier",
          content: "A must read blog",
        },
      ];
      
  
      
    return (
        <div>
           { blogReviews.map(review=><div className="border text-center" key={review.username}>
                    <h1>username:{review.username}</h1>
                    <p>blog title:{review.title}</p>
                    <p>{review.content}</p>
           </div>)}
        </div>
    );
};

export default Reviews;