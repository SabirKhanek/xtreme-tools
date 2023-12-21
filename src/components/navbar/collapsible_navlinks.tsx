import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

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
  return (
    <ul
      className={` md:hidden   transition-all ease-in-out duration-200 overflow-hidden h-fit max-h-[1000px] ${
        className || ""
      } ${!isCollapsed ? "!max-h-0" : "border border-t-white sm:border-[0px]"}`}
    >
      {links.map((link, index) => {
        return (
          <>
            <li key={index}>
              {!link.route.includes("#") && (
                <NavLink
                  className={({ isActive }) =>
                    `text-center block py-2 hover:bg-white/20 transition-all ease-in-out duration-150 ${
                      isActive
                        ? "text-black font-medium"
                        : "text-white/60 hover:text-black"
                    }`
                  }
                  to={link.route}
                >
                  {link.name}
                </NavLink>
              )}
              {link.route.includes("#") && (
                <NavHashLink
                  to={link.route}
                  smooth
                  className={({ isActive }) =>
                    `text-center block py-2 hover:bg-white/20 transition-all ease-in-out duration-150 ${
                      isActive
                        ? "text-black font-medium"
                        : "text-white/60 hover:text-black"
                    }`
                  }
                >
                  {link.name}
                </NavHashLink>
              )}
              {index !== links.length - 1 && (
                <hr
                  key={index}
                  className={`w-3/4 bg-light-grey mx-auto my-0`}
                />
              )}
            </li>
          </>
        );
      })}
    </ul>
  );
}
