import { NavLink } from "react-router-dom";

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
      className={`border border-t-light-grey sm:hidden  transition-all ease-in-out duration-200 overflow-hidden h-fit max-h-[1000px] ${
        className || ""
      } ${!isCollapsed ? "!max-h-0" : ""}`}>
      {links.map((link, index) => {
        return (
          <>
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  `text-center block py-2 hover:bg-bluer-white transition-all ease-in-out duration-1000 ${
                    isActive
                      ? "text-black font-medium"
                      : "text-grey hover:text-black"
                  }`
                }
                to={link.route}>
                {link.name}
              </NavLink>
              <hr className={`w-3/4 bg-light-grey mx-auto my-0`} />
            </li>
          </>
        );
      })}
    </ul>
  );
}
