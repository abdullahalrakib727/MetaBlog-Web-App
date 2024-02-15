import { Outlet } from "react-router-dom";



import { Toaster } from "react-hot-toast";
import Container from "../components/Container/Container";
import NavBar from "../components/shared/Navbar/NavBar";
import Footer from "../components/shared/Footer/Footer";


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
