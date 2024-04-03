import { NavLink, useLocation } from "react-router-dom";
import styles from "./navlink.module.css";
import { FaUsers } from "react-icons/fa";

const AdminLinks = () => {
  const location = useLocation();

  const links = [
    {
      name: "All Users",
      href: "/dashboard/all-users",
      icon: FaUsers,
      iconType: "FaUsers",
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
