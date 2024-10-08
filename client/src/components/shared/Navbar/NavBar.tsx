import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
import logos from "../../../assets/logos.png";
import ThemeSwitch from "../../Theme/ThemeSwitch";
import DarkLogoSvg from "../../../assets/Svgs/DarkLogoSvg";
import LightLogoSvg from "../../../assets/Svgs/LightLogoSvg";
import useSearchBar from "../../../hooks/useSearchBar";
import useAuth from "../../../hooks/useAuth";
import SearchBar from "../../SearchBar/SearchBar";
import { useState } from "react";

const NavBar = () => {
  const { user, logOutUser } = useAuth();
  const [visible, setvisible] = useState(false);

  const { handleInputChange, handleReset, blogs, navigate, handleSearch } =
    useSearchBar();

  const handleLogOut = () => {
    logOutUser();
    navigate("/");
  };

  const handleDropdown = () => {
    setvisible(!visible);
  };

  const navLinks = (
    <>
      <li onClick={handleDropdown}>
        <NavLink to="/">Home</NavLink>
      </li>
      <li onClick={handleDropdown}>
        <NavLink to="/blogs">All Blogs</NavLink>
      </li>
      <li onClick={handleDropdown}>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      {user ? (
        <>
          <li onClick={handleDropdown}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li
            onClick={() => {
              handleLogOut();
              handleDropdown();
            }}
          >
            <p>Logout</p>
          </li>
        </>
      ) : (
        <>
          <li onClick={handleDropdown}>
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
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={handleDropdown}
          >
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
          {/* this ul */}
          {visible && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-[#141624] dark:text-white rounded-box w-52 z-20"
            >
              {navLinks}
            </ul>
          )}
        </div>
        <div className="md:hidden">
          <Link to="/">
            <img src={logos} alt="site-logo" className="filter invert dark:filter-none dark:invert-0" />
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
        <SearchBar
          blogs={blogs}
          onChange={handleInputChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />
        <ThemeSwitch />
      </div>
    </nav>
  );
};
export default NavBar;
