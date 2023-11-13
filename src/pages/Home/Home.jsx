
import { Helmet } from "react-helmet";
import RecentBlog from "../Recent Blog/RecentBlog";
import Banner from "./Components/Banner";
import Marque from "./Components/Marque";


const Home = () => {
    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Blog-Zone</title>
            </Helmet>
            <Marque></Marque>
            <h3 className="text-4xl text-center font-bold mt-5 mb-5">Welcome to Blog-Zone</h3>
            <Banner></Banner>
            <h3 className="text-4xl text-center font-bold mt-5 mb-5">Recent Blogs</h3>
            <div className="mb-10">
               <RecentBlog></RecentBlog>
            </div>
        </div>
    );
};

export default Home;