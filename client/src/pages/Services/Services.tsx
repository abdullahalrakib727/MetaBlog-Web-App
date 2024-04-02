import { Helmet } from "react-helmet";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <section className="dark:text-white">
      <>
        <Helmet>
          <title>Services | MetaBlog</title>
        </Helmet>
      </>
      <h3 className="text-3xl">Services Page</h3>
      <div className="flex flex-col gap-5 mt-10">
        {/* card-1 */}
        <div className="space-y-4 bg-white border border-[#E8E8EA] dark:bg-[#181A2A] dark:border-[#4b4c4f] p-5 rounded-md">
          <h4 className="text-2xl">Advertisement</h4>
          <p className="flex gap-1">
            <span className="text-green-600 text-lg">
              <TiTick />
            </span>
            <span>
              Our blog post advertisement service helps you promote your content
              effectively, reaching a wider audience and driving traffic to your
              blog. We utilize targeted advertising strategies to ensure your
              blog post reaches the right audience, increasing visibility and
              engagement.
            </span>
          </p>
          <Link to="/dashboard/advertisement">
            <button className="bg-green-600 mt-3 ml-4 text-white px-3 py-1 rounded-md text-sm">
              Get Started
            </button>
          </Link>
        </div>
        {/* card-2 */}
        <div className="space-y-4 bg-white border border-[#E8E8EA] dark:bg-[#181A2A] dark:border-[#4b4c4f] p-5 rounded-md">
          <h4 className="text-2xl">Premium Membership</h4>
          <h6>
            {" "}
            Premium membership offers exclusive access to premium features :
          </h6>
          <p className="flex gap-1">
            <span className="text-green-600 text-lg">
              <TiTick />
            </span>
            <span>Add free browsing</span>
          </p>
          <p className="flex gap-1">
            <span className="text-green-600 text-lg">
              <TiTick />
            </span>
            <span>features, and premium support. Members also</span>
          </p>
          <p className="flex gap-1">
            <span className="text-green-600 text-lg">
              <TiTick />
            </span>
            <span>Changing username and changing their image</span>
          </p>
          <p className="flex gap-1">
            <span className="text-green-600 text-lg">
              <TiTick />
            </span>
            <span>Add Blog without admin's approval</span>
          </p>
          <Link to="/dashboard/membership">
            <button className="bg-green-600 mt-3 ml-4 text-white px-3 py-1 rounded-md text-sm">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
