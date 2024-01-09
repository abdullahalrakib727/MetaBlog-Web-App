import { Link } from "react-router-dom";
import image from "../../assets/images/Scarecrow.png"
import './ErrorPage.css'
const ErrorPage = () => {
    return (
        <section className="max-w-[1216px] mx-auto">
        <header>
          <h3 className="font-space-mono font-semibold text-[19px] mt-10 mb-10 ml-10 lg:ml-0">404 not found</h3>
        </header>
        <main>
          <div className="banner-container flex flex-col md:flex-row justify-center items-center gap-5 md:gap-20">
            <div className="">
              <img  src={image} alt="" />
            </div>
            <div className="banner-text">
              <h1 className="text-[#333] font-space-mono text-5xl font-semibold mb-9 md:mt-20 w-3/4">I have bad news for you</h1>
              <p className="banner-description text-[#4f4f4f] font-space-mono font-normal text-xl mb-16">
                The page you are looking for might be removed or is temporarily
                unavailable
              </p>
              <Link to='/'><button className="font-space-mono bg-[#333] font-bold text-base p-6 text-white">Back to homepage</button></Link>
            </div>
          </div>
        </main>
      </section>
    );
};

export default ErrorPage;