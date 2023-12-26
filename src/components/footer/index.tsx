import { FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { getResponsiveClasses } from "../../shared/constants/getResponsiveClasses";

import { navLinks } from "../navbar";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

export interface FooterProps {
  className?: string;
}
export function Footer({ className }: FooterProps) {
  return (
    <section
      className={`${className}`}
      style={{
        backgroundImage: `linear-gradient(289deg, #58126A -40.56%, #F6B2E1 119.32%)`,
      }}
    >
      <div className={`${getResponsiveClasses()} pt-12`}>
        <div
          className={`flex justify-between border-b border-b-white flex-wrap gap-3 mb-2`}
        >
          {getIntro()}
          <div className="text-white/75">
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="flex flex-col gap-1 ml-2">
              {navLinks.map((val, index) => {
                return (
                  <NavHashLink
                    key={index}
                    className="hover:underline text-sm"
                    to={val.route}
                  >
                    {val.name}
                  </NavHashLink>
                );
              })}
            </ul>
          </div>

          <div className="text-white/75">
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="flex flex-col gap-1 ml-1">
              {[
                { name: "Privacy Policy", route: "#" },
                { name: "Terms and Conditions", route: "#" },
                { name: "Contact Us", route: "#" },
                { name: "Blogs", route: "#" },
              ].map((val, index) => {
                return (
                  <Link key={index} className="hover:underline" to={val.route}>
                    {val.name}
                  </Link>
                );
              })}
            </ul>
          </div>

          {getSocialLinks()}
        </div>

        <div className="flex justify-between items-center text-white/75">
          <div className="text-sm text-label text-center w-full my-5">
            2023 Xtreme Tools All Rights Reserved.
          </div>
        </div>
      </div>
    </section>
  );
}

const socialLinks = [
  {
    name: "1311 W Sprint St, Suite B, Monroe GA 30655",
    Icon: FaMapMarkedAlt,
    link: "#",
  },
  {
    name: "support@xtreme.tools",
    Icon: HiOutlineMail,
    link: "mailto:support@xtreme.tools",
  },
  { name: "+1 770-346-8500", Icon: FaPhoneAlt, link: "tel:0017703468500" },
];

function getSocialLinks() {
  return (
    <div className="text-white/75">
      <h3 className="text-white font-semibold mb-3">Contact Details</h3>
      <ul className="flex flex-col gap-1 ml-1">
        {socialLinks.map((link, index) => {
          return (
            <li key={index} className="flex items-center gap-2 text-sm">
              <link.Icon></link.Icon>
              <a className="hover:underline break-words" href={link.link}>
                {link.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function getIntro() {
  return (
    <div className="basis-80">
      <Link to={"/"}>
        <img className="mb-1" src="/logo.svg" alt="" />
      </Link>
      <div className="text-label text-sm break-words my-4 text-white/75">
        At Xtreme Tools, we are a dedicated team of passionate individuals who
        believe in the power of innovation and the limitless potential within
        each person.
      </div>
      {/* <div className="flex justify-between my-4">
        <img className="w-36 cursor-pointer" src={download_appstore} alt="" />
        <img className="w-36 cursor-pointer" src={download_googlepay} alt="" />
      </div> */}
    </div>
  );
}
