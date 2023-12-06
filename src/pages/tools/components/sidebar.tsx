import { FaMicrochip } from "react-icons/fa6";
import { BsGlobe2 } from "react-icons/bs";
import { LuBarChart2 } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
export interface ToolsSidebarProps {
  className?: string;
}
export function ToolsSidebar({ className }: ToolsSidebarProps) {
  const pathname = useLocation().pathname;
  const [expanded, setExpanded] = useState<number | null>(null);
  useEffect(() => {
    const expandedId = toolsList.findIndex((tool) => {
      return tool.sublinks
        .map((sublink) => sublink.src)
        .join(" ; ")
        .includes(pathname);
    });
    if (expanded !== expandedId) setExpanded(expandedId);
  }, []);
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
        name: "AI Writer",
        src: "/tools/ai/ai_writer",
      },
      {
        name: "AI Rewriter",
        src: "/tools/ai/ai_rewriter",
      },
      {
        name: "AI Outline Generator",
        src: "/tools/ai/outline_generator",
      },
      {
        name: "AI Translator",
        src: "/tools/ai/translate",
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
        src: "/tools/email_marketing/smtp_tester",
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
        src: "/tools/web/favicon_generator",
      },
      {
        name: "TOC Generator",
        src: "/tools/web/toc_generator",
      },
      {
        name: "Secure Password Generator",
        src: "/tools/web/secure_password_generator",
      },
      {
        name: "Privacy Policy Generator",
        src: "/tools/web/privacy_policy_generator",
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
