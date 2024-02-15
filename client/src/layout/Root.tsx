import { Outlet } from "react-router-dom";

import NavBar from "../shared/Navbar/NavBar";
import Footer from "../shared/Footer/Footer";

import { Toaster } from "react-hot-toast";
import Container from "../components/Container/Container";

const Root = () => {
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

export default Root;
