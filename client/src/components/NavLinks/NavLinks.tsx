import {
  HomeIcon,
  UserCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import { NavLink, useLocation } from "react-router-dom";

import styles from "./navlink.module.css";

const links = [
  { name: "Dashboard Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: UserCircleIcon,
  },
  {
    name: "Add Blog",
    href: "/dashboard/add",
    icon: PlusIcon,
  },
];

export default function NavLinks() {
  const location = useLocation();

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
            <LinkIcon className="w-6  ml-1" />
            <p className="hidden md:block  pl-1">{link.name}</p>
          </NavLink>
        );
      })}
    </>
  );
}
