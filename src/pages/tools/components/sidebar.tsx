import { FaMicrochip } from "react-icons/fa6";
import { BsGlobe2 } from "react-icons/bs";
import { LuBarChart2 } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
export interface ToolsSidebarProps {
  className?: string;
}
export function ToolsSidebar({ className }: ToolsSidebarProps) {
  const pathname = useLocation().pathname;
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className={`${className} p-5 py-10 shadow rounded-2xl min-h-[80vh]`}>
      <h2 className="text-primary font-semibold text-xl">Tools Collection</h2>
      {toolsList.map((val, index) => {
        const isExpanded = expanded === index;
        return (
          <div key={index}>
            <div
              className={`border-b border-[#DADADA] py-2 flex items-center gap-3 text-black/70 cursor-pointer transition-all duration-150 ${
                isExpanded && "text-primary"
              }`}
              onClick={() => {
                if (isExpanded) setExpanded(null);
                else setExpanded(index);
              }}
            >
              <val.icon />
              <span className="font-semibold">{val.name}</span>
            </div>

            <div
              className={`h-fit max-h-[1000px] transition-all ease-in-out duration-500 overflow-hidden ${
                !isExpanded ? "!max-h-0" : ""
              }`}
            >
              {val.sublinks.map((sublink, index) => {
                const isActivePath = pathname.includes(sublink.src);
                console.log(pathname, sublink.src, isActivePath);
                return (
                  <Link key={index} to={sublink.src}>
                    <div
                      className={`ml-4 flex items-center gap-3 text-[#969696] text-sm font-semibold hover:text-primary my-2 ${
                        isActivePath && "!text-primary"
                      }`}
                    >
                      <FaArrowRightLong />
                      {sublink.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const toolsList = [
  {
    name: "AI Tools",
    icon: FaMicrochip,
    sublinks: [
      {
        name: "AI Text Writer",
        src: "/tools/email_marketing/email_extractor#",
      },
      {
        name: "AI Content Writer",
        src: "/tools/email_marketing/email_extractor#",
      },
    ],
  },
  {
    name: "Email Tools",
    icon: MdOutlineEmail,
    sublinks: [
      {
        name: "Email Text Extraction",
        src: "/tools/email_marketing/email_extractor",
      },
      {
        name: "SMTP Tester",
        src: "/tools/email_marketing/email_extractor#",
      },
      {
        name: "Free Email Checker",
        src: "/tools/email_marketing/email_extractor#",
      },
      {
        name: "Bulk Email Verifier",
        src: "/tools/email_marketing/email_extractor#",
      },
      {
        name: "Subject Line Tester",
        src: "/tools/email_marketing/email_extractor#",
      },
    ],
  },
  {
    name: "Web Tools",
    icon: BsGlobe2,
    sublinks: [
      {
        name: "Favicon Generator",
        src: "/tools/email_marketing/email_extractor#",
      },
      {
        name: "TOC Generator",
        src: "/tools/email_marketing/email_extractor#",
      },
      {
        name: "Secure Password Generator",
        src: "/tools/web/secure_password_generator",
      },
      {
        name: "Privacy Policy Generator",
        src: "/tools/email_marketing/email_extractor#",
      },
    ],
  },
  {
    name: "SEO Tools",
    icon: LuBarChart2,
    sublinks: [
      {
        name: "Backlink Checker",
        src: "/tools/email_marketing/email_extractor#",
      },
      {
        name: "DA & PA Check",
        src: "/tools/email_marketing/email_extractor#",
      },
    ],
  },
];
