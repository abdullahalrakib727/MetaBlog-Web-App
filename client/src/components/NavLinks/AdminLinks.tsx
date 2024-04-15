import { NavLink, useLocation } from "react-router-dom";
import styles from "./navlink.module.css";
import { FaUsers,FaBloggerB } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";

const AdminLinks = () => {
  const location = useLocation();

  const links = [
    {
      name: "All Users",
      href: "/dashboard/all-users",
      icon: FaUsers,
      iconType: "FaUsers",
    },
    {
      name: "All Blogs",
      href: "/dashboard/all-blogs",
      icon: FaBloggerB,
      iconType: "FaBloggerB",
    },
    {
      name: "Other Services",
      href: "/dashboard/others-services",
      icon: FaSlidersH,
      iconType: "FaSlidersH",
    },
  ];


  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <NavLink
            key={link.name}
            to={link.href}
            className={
              location.pathname === link.href
                ? `${styles.active} flex items-center py-2 rounded-sm`
                : "flex items-center py-2 rounded-sm"
            }
          >
            <LinkIcon
              className={
                link.iconType == "MdOutlineMiscellaneousServices"
                  ? "text-xl w-6 ml-1"
                  : "w-6 ml-1"
              }
            />
            <p className="hidden md:block  pl-1">{link.name}</p>
          </NavLink>
        );
      })}
    </>
  );
};

export default AdminLinks;
