import { Link, NavLink, useNavigate } from "react-router-dom";

import { useCallback, useContext, useEffect, useState } from "react";
import { TfiSearch } from "react-icons/tfi";

import "./Nav.css";

import logo from "../../../assets/Logo.png";
import logo2 from "../../../assets/lightlogo.png";
import { debounce } from "lodash";
import ThemeSwitch from "../../Theme/ThemeSwitch";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../api/useAxiosPublic";
import DarkLogoSvg from "../../Svgs/DarkLogoSvg";
import LightLogoSvg from "../../Svgs/LightLogoSvg";
import { BlogsProps } from "../../../api/useBlogData";

const NavBar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  const handleSearch = useCallback(async () => {
    if (value.trim() === "") {
      clearSearchResults();
      return;
    }

    const res = await axiosPublic.get(`/blogs/search?include=${value}`);
    setBlogs(res.data.data);
  }, [value, axiosPublic]);

  const debouncedHandleSearch = debounce(handleSearch, 300);

  const clearSearchResults = () => {
    setBlogs([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (e.target.value.trim() === "") {
      clearSearchResults();
    } else {
      debouncedHandleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, [value, handleSearch]);

  const handleReset = () => {
    setValue("");
    clearSearchResults();
  };

  const handleLogOut = async () => {
    await logOutUser();
    await navigate("/");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/add">Add Blog</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/blogs">All Blogs</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li onClick={handleLogOut}>
            <NavLink to="/login">Logout</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar bg-white dark:bg-[#181A2A] dark:text-white  max-w-[1216px] mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-[#141624] dark:text-white  rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <div>
          <Link to="/" className="md:hidden relative">
            <img src={logo} alt="site-logo" />
            <div className="absolute md:hidden dark:hidden top-0">
              <img src={logo2} alt="site-logo" />
            </div>
          </Link>
        </div>
        <div className="relative w-2/4 hidden md:flex">
          <Link to="/">
            <DarkLogoSvg />
          </Link>
          <Link to="/" className="absolute dark:hidden">
            <LightLogoSvg />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[#3B3C4A] dark:text-white">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end  mr-2 relative">
          <input
            type="text"
            onChange={(e) => handleInputChange(e)}
            placeholder="Search"
            className="border px-3 py-1 bg-[#F4F4F5] dark:text-[#A1A1AA] dark:bg-[#242535] dark:border-none rounded-md w-full max-w-xs"
          />
          <TfiSearch
            onClick={handleSearch}
            className="absolute dark:text-[#52525B] bottom-2 right-2 cursor-pointer overflow-hidden"
          />
          {blogs.length > 0 && (
            <div className="absolute mt-2 bg-white border border-[#E8E8EA] dark:bg-[#181A2A] dark:border-[#242535] z-10 p-2 rounded-xl space-y-1 overflow-x-auto max-h-40">
              {blogs.map((blog: BlogsProps) => (
                <Link
                  to={`blogs/${blog._id}`}
                  onClick={handleReset}
                  className="bg-white border dark:bg-[#242535]  border-[#E8E8EA] dark:border-[#242535]  p-1 rounded-md inline-block"
                  key={blog._id}
                >
                  {blog.title.length > 40
                    ? blog.title.slice(0, 40) + "..."
                    : blog.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        <ThemeSwitch />
      </div>
    </nav>
  );
};
export default NavBar;
