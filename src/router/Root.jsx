import { Outlet } from "react-router-dom";
// import ResponsiveAppBar from "../shared/Navbar/ResponsiveAppBar";
// import Navbar from "../shared/Navbar/Navbar";
import Nav from "../shared/Navbar/Nav";
import Footer from "../shared/Footer/Footer";
// import Navbar from "../shared/Navbar/Navbar";


const Root = () => {
    return (
    <div className="max-2xl">
        <Nav></Nav>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
    );
};

export default Root;