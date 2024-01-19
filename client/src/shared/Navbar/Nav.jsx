import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import { TfiSearch } from "react-icons/tfi";

import LightLogoSvg from "../../components/Svgs/LightLogoSvg";
import "./Nav.css";
import ThemeSwitch from "../../components/ThemeSwitch";
import DarkLogoSvg from "../../components/Svgs/DarkLogoSvg";

import logo from "../../assets/logos.png";
import logo2 from "../../assets/lightlogo.png";

function Nav() {
  const { user, logOutUser } = useContext(AuthContext);

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
        <NavLink to="/all">All Blogs</NavLink>
      </li>
      <li>
        <NavLink to="/featured">Featured Blogs</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li onClick={() => logOutUser()}>
            <NavLink to="/login">Logout</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
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
            <img src={logo} alt="" />
            <div className="absolute md:hidden dark:hidden top-0">
              <img src={logo2} alt="" />
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
        <div className="dropdown dropdown-end relative mr-2">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 bg-[#F4F4F5] dark:text-[#A1A1AA] dark:bg-[#242535] dark:border-none rounded-md w-full max-w-xs"
          />
          <TfiSearch className="absolute dark:text-[#52525B] bottom-2 right-2 cursor-pointer overflow-hidden" />
        </div>
        <ThemeSwitch />
      </div>
    </nav>
  );
}
export default Nav;
