import { useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./navlinks";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { CollapsibleNavLink } from "./collapsible_navlinks";
import { getResponsiveClasses } from "../../shared/constants/getResponsiveClasses";
import { Button } from "../button";
import { useAuth } from "../../shared/contexts/auth";
import avatar from "./assets/avatar.svg";
import { CiLogout } from "react-icons/ci";

import { FaGear } from "react-icons/fa6";
import { logout } from "../../services/auth";
export interface NavBarProps {
  className?: string;
  bgClassApplied?: boolean;
}

export function Navbar({ className, bgClassApplied }: NavBarProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const auth = useAuth();
  const responsiveClasses = getResponsiveClasses();

  return (
    <nav
      className={`relative border-b bg-transparent border-b-white/20 ${className} ${
        bgClassApplied
          ? "bg-[linear-gradient(289deg,#58126A_-40.56%,#F6B2E1_119.32%)]"
          : " dsf"
      }`}
    >
      <div
        className={`${responsiveClasses} flex justify-between py-3 items-center gap-10`}
      >
        <div className="flex justify-between items-center grow">
          <div className="flex gap-2 justify-center items-center">
            <button
              className="md:hidden hover:bg-light-grey transition-all duration-100"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <FaBars className="text-4xl border border-black rounded-md text-black p-1 border-grey" />
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
          {!auth.authDetails.isLoggedIn && (
            <Link to={"/login"}>
              <Button className="bg-primary">
                <div className="flex items-center gap-1">
                  <AiOutlineUser />
                  <span>Sign In</span>
                </div>
              </Button>
            </Link>
          )}
          {auth.authDetails.isLoggedIn && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="bg-[#58126A] rounded-xl cursor-pointer px-3 py-2 flex items-center gap-2 text-white "
              >
                <img width={20} height={20} src={avatar} alt="" />
                <span className="text-sm">Account</span>
                <FaChevronDown className="text-sm" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-fit mt-4 text-black/70"
              >
                <li>
                  <div className="flex gap-2 items-center">
                    <FaGear />
                    <span>Settings</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex gap-2 items-center"
                    onClick={() => logout()}
                  >
                    <CiLogout />
                    <span>Logout</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {<CollapsibleNavLink isCollapsed={isCollapsed} links={navLinks} />}
    </nav>
  );
}

export const navLinks = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "AI",
    route: "#ai_tools",
  },
  {
    name: "SEO",
    route: "#seo_tools",
  },
  {
    name: "Email",
    route: "#email_marketing_tools",
  },
  {
    name: "Web",
    route: "#web_tools",
  },
];
