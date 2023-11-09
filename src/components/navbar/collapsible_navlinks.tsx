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
      className={` sm:hidden   transition-all ease-in-out duration-200 overflow-hidden h-fit max-h-[1000px] ${
        className || ""
      } ${!isCollapsed ? "!max-h-0" : "border border-t-white sm:border-[0px]"}`}
    >
      {links.map((link, index) => {
        return (
          <>
            <li key={index}>
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
              {index !== links.length - 1 && (
                <hr className={`w-3/4 bg-light-grey mx-auto my-0`} />
              )}
            </li>
          </>
        );
      })}
    </ul>
  );
}
