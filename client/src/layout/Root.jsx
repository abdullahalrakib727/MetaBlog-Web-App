import { Outlet } from "react-router-dom";

import Nav from "../shared/Navbar/Nav";
import Footer from "../shared/Footer/Footer";

import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <>
      <Nav></Nav>
      <div className="max-w-[1216px] mx-auto">
        <Toaster position="top-center" reverseOrder={false} />
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Root;
