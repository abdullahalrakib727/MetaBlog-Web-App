import { Outlet } from "react-router-dom";

import Nav from "../shared/Navbar/Nav";
import Footer from "../shared/Footer/Footer";

import { Toaster } from "react-hot-toast";
import Container from "../components/Container/Container";

const Root = () => {
  return (
    <>
      <Nav></Nav>
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
