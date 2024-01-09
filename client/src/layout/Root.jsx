import { Outlet } from "react-router-dom";
// import ResponsiveAppBar from "../shared/Navbar/ResponsiveAppBar";
// import Navbar from "../shared/Navbar/Navbar";
import Nav from "../shared/Navbar/Nav";
import Footer from "../shared/Footer/Footer";
// import Navbar from "../shared/Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <Nav></Nav>

      <div className="max-w-[1216px] mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
