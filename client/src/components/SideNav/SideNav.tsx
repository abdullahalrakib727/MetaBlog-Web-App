import { Link } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import useAuth from "../../hooks/useAuth";
import { PowerIcon } from "@heroicons/react/24/outline";
import ThemeSwitch from "../Theme/ThemeSwitch";

const SideNav = () => {
  const { logOutUser } = useAuth();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-[#E8E8EA] dark:bg-[#242535] p-4 md:h-40"
        to="/"
      >
        <div className="w-32 dark:text-white md:w-40">
          {/* <AcmeLogo /> */} Logo
        </div>
      </Link>
      <button
        type="button"
        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <>
          <p className="dark:text-white">Swtich theme</p>
          <ThemeSwitch />
        </>
      </button>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 dark:text-white">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <button
          onClick={logOutUser}
          type="button"
          className="flex  dark:bg-[#242535] h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-[#F6F6F7] hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6 font-semibold" />
          <div className="hidden md:block">Log Out</div>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
