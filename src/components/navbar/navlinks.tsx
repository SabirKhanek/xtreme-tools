import { NavLink } from "react-router-dom";

export interface NavLinksProps {
  links: {
    route: string;
    name: string;
  }[];
  className?: string;
}

export default function NavLinks({ links, className }: NavLinksProps) {
  return (
    <ul className={`hidden md:flex gap-1 md:gap-3 items-center ${className}`}>
      {links.map((link, index) => {
        return (
          <>
            <NavLink
              key={index}
              to={link.route}
              className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black font-medium"
                    : "text-white/60 hover:text-black"
                } hover:underline`
              }
            >
              {link.name}
            </NavLink>
            {index !== links.length - 1 && (
              <div className="w-0.5 h-3 bg-light-grey"></div>
            )}
          </>
        );
      })}
    </ul>
  );
}
