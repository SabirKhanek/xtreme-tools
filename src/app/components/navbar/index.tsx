"use client";
import { useState } from "react";
import NavLinks from "./navlinks";
import { FaBars } from "react-icons/fa";
import { CollapsibleNavLink } from "./collapsible_navlinks";
import Link from "next/link";
import { ProfileButton } from "./account_button";
import { navLinks } from "./navlinks_data";
import Nossr from "../nossr";

export interface NavBarProps {
  className?: string;
  bgClassApplied?: boolean;
  ref?: any;
}

export function Navbar({ className, bgClassApplied, ref }: NavBarProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  // const modals = useModal();
  return (
    <nav
      className={`relative border-b bg-transparent border-b-white/20 ${className} ${
        bgClassApplied
          ? "bg-[linear-gradient(289deg,#58126A_-40.56%,#F6B2E1_119.32%)]"
          : " dsf"
      }`}
      ref={ref}
    >
      <div
        className={`responsive flex justify-between py-3 items-center gap-10`}
      >
        <div className="flex justify-between items-center grow">
          <div className="flex gap-2 justify-center items-center">
            <button
              className="md:hidden hover:bg-light-grey transition-all duration-100"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <FaBars className="text-4xl border border-black rounded-md text-black p-1 border-grey" />
            </button>
            <Link href={"/"}>
              <img
                src="/x_logo.svg"
                className="h-[55px] w-auto"
                alt="Xtreme tools Logo"
              />
            </Link>
          </div>
          <NavLinks links={navLinks}></NavLinks>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="flex items-center gap-2">
            <Button className="bg-primary">Buy Car</Button>
            <Button className="bg-highlight">Long Term Rental</Button>
          </div> */}
          {/* <ProfileDropDown></ProfileDropDown> */}
          <Nossr>
            <ProfileButton />
          </Nossr>
        </div>
      </div>
      {<CollapsibleNavLink isCollapsed={isCollapsed} links={navLinks} />}
    </nav>
  );
}
