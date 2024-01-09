



import {  NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import { TfiSearch } from "react-icons/tfi";

import logo from '/Logo.svg'
import './Nav.css'


// const pages = ['Products', 'Pricing', 'Blog'];

function Nav() {
  const { user, logOutUser } = useContext(AuthContext);


  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
     {
      user &&  <li>
      <NavLink to="/add">Add Blog</NavLink>
    </li>
     }
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
            <NavLink to='/login' >
              Logout
            </NavLink>
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
    <div className="navbar bg-white  max-w-[1216px] mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
   {navLinks}
      </ul>
    </div>
    {/* <a className=" text-xl text-[#3B3C4A] font-bold italic">Blog Zone</a> */}
    <img src={logo} alt="" />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-[#3B3C4A]">
     {navLinks}
    </ul>
  </div>
  <div className="navbar-end">
  <div className="dropdown dropdown-end relative">
  <input type="text" placeholder="Search" className="border px-3 py-1 bg-[#F4F4F5] w-full max-w-xs" />
  <TfiSearch className="absolute bottom-2 right-2 cursor-pointer overflow-hidden" />
    </div>
  </div>
</div>
  );
}
export default Nav;
