



import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";



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
          {" "}
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
    </>
  );



  return (
    <div className="navbar bg-[#1976D2]">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
   {navLinks}
      </ul>
    </div>
    <a className=" text-xl text-white font-bold italic">Blog Zone</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-white">
     {navLinks}
    </ul>
  </div>
  <div className="navbar-end">
  <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user?.photoURL ? user.photoURL :'https://i.ibb.co/xXQLtfb/user.png'} />
        </div>
      </label>
    
    </div>
  </div>
</div>
  );
}
export default Nav;
