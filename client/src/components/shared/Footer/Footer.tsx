import { Link } from "react-router-dom";

import { FC } from "react";

import { MdOutlineEmail } from "react-icons/md";
import FooterDarkLogo from "../../../assets/Svgs/FooterDarkLogo";
import FooterLogoLight from "../../../assets/Svgs/FooterLogoLight";

const Footer: FC = (): JSX.Element => {
  return (
    <footer className=" bg-[#F6F6F7] dark:bg-[#141624] p-2">
      <div className="footer py-10 px-4 lg:py-16 text-base-content max-w-[1216px] mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <nav className="flex flex-col">
            <header className="text-[#181A2A] dark:text-white text-lg font-semibold">
              About
            </header>
            <p className="mt-2 mb-6 text-[#696A75] dark:text-[#97989F]">
              MetaBlog is a platform for bloggers to explore and discuss various
              topics, promoting engaging conversations and knowledge sharing.
            </p>
            <p>
              <span className="text-[#181A2A] dark:text-white font-normal text-base">
                Email:{" "}
              </span>
              <span className="text-[#3B3C4A] dark:text-[#97989F]">
                {" "}
                info@metablog.net
              </span>
            </p>
            <p>
              <span className="text-[#181A2A] dark:text-white font-normal text-base">
                Phone :{" "}
              </span>

              <span className="text-[#3B3C4A] dark:text-[#97989F]">
                880 123 456 789
              </span>
            </p>
          </nav>

          <div className="flex gap-10">
            <nav className="flex flex-col gap-2">
              <header className="text-[#181A2A] dark:text-white text-lg font-semibold">
                Quick Link
              </header>
              <Link
                to="/"
                className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]"
              >
                Home
              </Link>
              <a className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]">
                About
              </a>
              <a className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]">
                Archived
              </a>
              <a className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]">
                Author
              </a>
              <a className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]">
                Contact
              </a>
            </nav>
            <nav className="flex flex-col gap-2">
              <header className="text-[#181A2A] dark:text-white text-lg font-semibold">
                Category
              </header>
              <Link
                to={`/blogs?category=Lifestyle`}
                className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]"
              >
                Lifestyle
              </Link>
              <Link
                to={`/blogs?category=Technology`}
                className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]"
              >
                Technology
              </Link>
              <Link
                to={`/blogs?category=Travel`}
                className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]"
              >
                Travel
              </Link>
              <Link
                to={`/blogs?category=Business`}
                className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]"
              >
                Business
              </Link>
              <Link
                to={`/blogs?category=Economy`}
                className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]"
              >
                Economy
              </Link>
              <Link
                to={`/blogs?category=Sports`}
                className="link link-hover dark:text-[#BABABF] text-[#3B3C4A]"
              >
                Sports
              </Link>
            </nav>
          </div>

          <div>
            <div className="minlg:min-w-[328px] minlg:min-h-[190px] bg-white dark:bg-[#181A2A] flex flex-col p-8 rounded-xl">
              <div>
                <h1 className="text-xl font-semibold text-center dark:text-white text-[#181A2A]">
                  Weekly Newsletter
                </h1>
                <p className="text-[#696A75] dark:text-[#97989F] mt-2 text-center text-base sm:text-sm">
                  Get blog articles and offers via email
                </p>
              </div>
              <div className="relative mt-7">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="outline-none border dark:border-[#3B3C4A] px-4 py-3
                  bg-white border-[#DCDDDF]
                 dark:bg-[#181A2A] dark:text-white w-full rounded-md
                  
                  "
                />

                <div className="absolute dark:text-white right-5 top-4 text-[#696A75]">
                  <MdOutlineEmail />
                </div>
              </div>

              <button
                type="button"
                className="text-white mt-2 bg-[#4B6BFB] py-3 rounded-md"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col-reverse md:flex-row  items-center justify-between  py-8 border-t dark:border-[#242535]  bg-[#F6F6F7] dark:bg-[#141624] max-w-[1216px] mx-auto text-base-content border-base-300">
        <aside className="items-center grid-flow-col">
          {/* logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <FooterLogoLight />
              <div className="absolute bottom-0 hidden dark:inline-block">
                <FooterDarkLogo />
              </div>
            </div>
            <div className="dark:text-white">
              <p className="text-xl sm:text-lg ">
                Meta<span className="font-extrabold">Blog</span>
              </p>
              <p className="text-base sm:text-sm">© MetaBlog 2023. All Rights Reserved.</p>
            </div>
          </div>
        </aside>




        <div className="md:place-self-center md:justify-self-end mb-10 md:mb-0">
          <div className="grid grid-flow-col gap-4 text-base font-normal text-[#3B3C4A] dark:text-[#BABABF]">
            <a className="cursor-pointer">Terms of Use</a>
            <a className="cursor-pointer">Privacy Policy</a>
            <a className="cursor-pointer">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
