import { Outlet } from "react-router-dom";
// import ResponsiveAppBar from "../shared/Navbar/ResponsiveAppBar";
// import Navbar from "../shared/Navbar/Navbar";
import Nav from "../shared/Navbar/Nav";
// import Navbar from "../shared/Navbar/Navbar";


const Root = () => {
    return (
    <div>
        <Nav></Nav>
        <Outlet></Outlet>
    </div>
    );
};

export default Root;