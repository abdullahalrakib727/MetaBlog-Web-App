import { Toaster } from "react-hot-toast";
import NavBar from "../components/shared/Navbar/NavBar";

import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";
import Container from "../components/Container/Container";



const Dashboard = () => {
    return (
        <>
        <NavBar></NavBar>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
          <Container>
            <Outlet></Outlet>
          </Container>
        </div>
        <Footer></Footer>
      </>
    );
};

export default Dashboard;