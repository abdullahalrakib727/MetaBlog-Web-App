import { Helmet } from "react-helmet";
import RecentBlog from "../../Recent Blog/RecentBlog";
import Banner from "../Components/Banner";
import Marque from "../Components/Marque";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/all");
  };

  return (
    <div className="mb-24">
      <Helmet>
        <title>MetaBlog</title>
      </Helmet>
      <div className="flex items-center justify-center mt-5 ">
        <p className="p-2 text-white text-2xl bg-[#1976D2]">Recent</p>
        <div className="w-3/4">
          <Marque></Marque>
        </div>
      </div>
      <h3 className="text-4xl text-center font-bold mt-5 mb-5">
        Welcome to MetaBlog
      </h3>
      <Banner></Banner>

      <div>
        <RecentBlog></RecentBlog>
        <div className="mt-8 text-center">
          <button
            onClick={handleClick}
            className="px-5 py-3 border border-[#696A75] rounded-md text-[#696A75] text-base font-medium hover:bg-[#97989F] hover:text-white hover:border-[#97989F] transition-colors delay-200"
          >
            View All Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
