import { Toaster } from "react-hot-toast";

import { Outlet } from "react-router-dom";
import Container from "../components/Container/Container";
import SideNav from "../components/SideNav/SideNav";

const Dashboard = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64 bg-[#F6F6F7] dark:bg-[#141624]">
          <SideNav />
        </div>

        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          <Container>
            <Toaster position="top-center" reverseOrder={false} />
            <Outlet></Outlet>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
