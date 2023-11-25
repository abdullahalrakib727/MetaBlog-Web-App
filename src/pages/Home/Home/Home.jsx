import { Helmet } from "react-helmet";
import RecentBlog from "../../Recent Blog/RecentBlog";
import Banner from "../Components/Banner";
import Marque from "../Components/Marque";
import NewSletter from "../Components/New Sletter/NewSletter";
import Reviews from "../Reviews/Reviews";
import Contact from "../Components/Contact.jsx/Contact";
import useAuth from '../../../hooks/useAuth'

const Home = () => {
  const {user} =useAuth();
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Blog-Zone</title>
      </Helmet>
      <div className="flex items-center justify-center mt-5 ">
        <p className="p-2 text-white text-2xl bg-[#1976D2]">Recent</p>
        <div className="w-3/4">
          <Marque></Marque>
        </div>
      </div>
      <h3 className="text-4xl text-center font-bold mt-5 mb-5">
        Welcome to Blog-Zone
      </h3>
      <Banner></Banner>
      <h3 className="text-4xl text-center font-bold mt-5 mb-5">Recent Blogs</h3>
      <div className="mb-10">
        <RecentBlog></RecentBlog>
        <NewSletter></NewSletter>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h1 className="text-4xl text-center font-bold mt-5 mb-5">See what's our reviewer says</h1>
        <Reviews></Reviews>
        {
          user && <Contact></Contact>
        }
      </div>
    </div>
  );
};

export default Home;
