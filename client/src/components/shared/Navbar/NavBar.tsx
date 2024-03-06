import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
import logo from "../../../assets/Logo.png";
import logo2 from "../../../assets/lightlogo.png";
import ThemeSwitch from "../../Theme/ThemeSwitch";
import DarkLogoSvg from "../../Svgs/DarkLogoSvg";
import LightLogoSvg from "../../Svgs/LightLogoSvg";
import useSearchBar from "../../../hooks/useSearchBar";
import useAuth from "../../../hooks/useAuth";
import SearchBar from "../../SearchBar/SearchBar";

const NavBar = () => {
  const { user, logOutUser } = useAuth();

  const { handleInputChange, handleReset, blogs, navigate, handleSearch } =
    useSearchBar();

  const handleLogOut = () => {
    logOutUser();
    navigate("/");
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
            <p>Logout</p>
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
