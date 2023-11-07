import { useState } from "react";

import NavLinks from "./navlinks";
import { FaBars } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { CollapsibleNavLink } from "./collapsible_navlinks";
import { getResponsiveClasses } from "../../shared/constants/getResponsiveClasses";
import { Button } from "../button";

export interface NavBarProps {
  className?: string;
}

export function Navbar({ className }: NavBarProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const responsiveClasses = getResponsiveClasses();

  return (
    <nav className={`border-b bg-transparent border-b-white/20 ${className}`}>
      <div
        className={`${responsiveClasses} flex justify-between py-3 items-center gap-10`}
      >
        <div className="flex justify-between items-center grow">
          <div className="flex gap-2 justify-center items-center">
            <button
              className="md:hidden hover:bg-light-grey transition-all duration-100"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <FaBars className="text-4xl border rounded-md text-black p-1 border-grey" />
            </button>
            <img
              src="/logo.svg"
              className="h-[55px] w-auto"
              alt="001 Cars Logo"
            />
          </div>
          <NavLinks links={navLinks}></NavLinks>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="flex items-center gap-2">
            <Button className="bg-primary">Buy Car</Button>
            <Button className="bg-highlight">Long Term Rental</Button>
          </div> */}
          {/* <ProfileDropDown></ProfileDropDown> */}
          <Button className="bg-primary">
            <div className="flex items-center gap-1">
              <AiOutlineUser />
              <span>Sign In</span>
            </div>
          </Button>
        </div>
      </div>
      {<CollapsibleNavLink isCollapsed={isCollapsed} links={navLinks} />}
    </nav>
  );
}

const navLinks = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Discover",
    route: "/blog",
  },
  {
    name: "AI",
    route: "/contact",
  },
  {
    name: "SEO",
    route: "/about_us",
  },
  {
    name: "Email",
    route: "/about_us",
  },
  {
    name: "Web",
    route: "/about_us",
  },
];
