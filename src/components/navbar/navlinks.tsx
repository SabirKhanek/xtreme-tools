import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
export interface NavLinksProps {
  links: {
    route: string;
    name: string;
  }[];
  className?: string;
}

export default function NavLinks({ links, className }: NavLinksProps) {
  return (
    <ul className={`hidden md:flex gap-3 md:gap-6 items-center ${className}`}>
      {links.map((link, index) => {
        return (
          <>
            {!link.route.includes("#") && (
              <NavLink
                key={index}
                to={link.route}
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? "text-black font-medium"
                      : "text-white/60 hover:text-black"
                  } hover:text-white/70`
                }
              >
                {link.name}
              </NavLink>
            )}
            {link.route.includes("#") && (
              <NavHashLink
                to={link.route}
                key={index}
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? "text-black font-medium"
                      : "text-white/60 hover:text-black"
                  } hover:text-white/70`
                }
              >
                {link.name}
              </NavHashLink>
            )}
          </>
        );
      })}
    </ul>
  );
}
