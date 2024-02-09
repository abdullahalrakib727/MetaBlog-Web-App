import { Helmet } from "react-helmet";
import RecentBlog from "../../Recent Blog/RecentBlog";
import Banner from "../Components/Banner";

import { useNavigate } from "react-router-dom";
import Adds from "../../../components/Adds/Adds";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/blogs");
  };

  return (
    <div className="mb-24">
      <Helmet>
        <title>MetaBlog</title>
      </Helmet>
      <section className="mb-10 mt-14 md:mb-[144px]">
        <Banner></Banner>
      </section>
      <section className="flex mb-10 lg:mb-20  justify-center">
        <Adds />
      </section>
      <section>
        <RecentBlog></RecentBlog>
        <div className="mt-8 mb-10 lg:mb-20 text-center">
          <button
            onClick={handleClick}
            className="px-5 py-3 border dark:text-white dark:bg-[#181A2A] dark:border-[#242535] border-[#696A75] rounded-md text-[#696A75] text-base font-medium hover:bg-[#97989F] hover:text-white hover:border-[#97989F] transition-colors duration-500"
          >
            View All Post
          </button>
        </div>
      </section>
      <section className="flex justify-center">
        <Adds />
      </section>
    </div>
  );
};

export default Home;
