"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// import { NavHashLink } from "react-router-hash-link";
export interface NavLinksProps {
  links: {
    route: string;
    name: string;
  }[];
  className?: string;
}

export default function NavLinks({ links, className }: NavLinksProps) {
  const router = useRouter();
  const pathname = usePathname()
  return (
    <ul className={`hidden md:flex gap-3 md:gap-6 items-center ${className}`}>
      {links.map((link, index) => {
        return (
          <>
            {
              <Link
                key={index}
                href={link.route}
                className={` ${
                   pathname=== link.route
                    ? "text-black font-medium"
                    : "text-white/60 hover:text-black"
                } hover:text-white/70`}
              >
                {link.name}
              </Link>
            }
          </>
        );
      })}
    </ul>
  );
}
