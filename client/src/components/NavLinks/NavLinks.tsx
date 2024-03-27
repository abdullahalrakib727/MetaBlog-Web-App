import {
  HomeIcon,
  UserCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";

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
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link key={link.name} to={link.href}>
            <LinkIcon className="w-6 mt-2" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
