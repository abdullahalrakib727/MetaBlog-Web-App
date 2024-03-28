import { Outlet } from "react-router-dom";
import Container from "../components/Container/Container";
import NavBar from "../components/shared/Navbar/NavBar";
import Footer from "../components/shared/Footer/Footer";


const Root = () => {

  return (
    <>
      <NavBar></NavBar>
      <div>
        <Container>
          <Outlet></Outlet>
        </Container>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Root;
