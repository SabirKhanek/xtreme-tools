"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export interface CollapsibleNavLinksProps {
  links: {
    route: string;
    name: string;
  }[];
  className?: string;
  isCollapsed: boolean;
}

export function CollapsibleNavLink({
  links,
  className,
  isCollapsed,
}: CollapsibleNavLinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <ul
      className={` md:hidden   transition-all ease-in-out duration-200 overflow-hidden h-fit max-h-[1000px] ${
        className || ""
      } ${!isCollapsed ? "!max-h-0" : "border border-t-white sm:border-[0px]"}`}
    >
      {links.map((link, index) => {
        return (
          <div key={index}>
            <li className="scroll-smooth">
              {
                <Link
                  className={`text-center block py-2 hover:bg-white/20 transition-all ease-in-out duration-150 ${
                    pathname === link.route
                      ? "text-black font-medium"
                      : "text-white/60 hover:text-black"
                  }`}
                  href={link.route}
                >
                  {link.name}
                </Link>
              }

              {index !== links.length - 1 && (
                <hr
                  key={index}
                  className={`w-3/4 bg-light-grey mx-auto my-0`}
                />
              )}
            </li>
          </div>
        );
      })}
    </ul>
  );
}
