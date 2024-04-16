"use client";

import { useAuth } from "@/app/shared/contexts/auth";
import Link from "next/link";
import { Button } from "../button";
import { AiOutlineUser } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { logout } from "../../services/auth";
import avatar from "./assets/avatar.svg";
import Image from "next/image";

export function ProfileButton() {
  const auth = useAuth();

  return (
    <>
      {!auth.authDetails.isLoggedIn && (
        <Link href={"/login"}>
          <Button className="bg-primary">
            <div className="flex items-center gap-1">
              <AiOutlineUser />
              <span>Sign In</span>
            </div>
          </Button>
        </Link>
      )}
      {auth.authDetails.isLoggedIn && (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="bg-[#58126A] rounded-xl cursor-pointer px-3 py-2 flex items-center gap-2 text-white "
          >
            <Image width={20} height={20} src={avatar} alt="" />
            <span className="text-sm">Account</span>
            <FaChevronDown className="text-sm" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-fit mt-4 text-black/70"
          >
            {/* <li
                  onClick={async () => {
                    modals.openModal("update_profile");
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <FaGear />
                    <span>Settings</span>
                  </div>
                </li> */}
            <li>
              <div className="flex gap-2 items-center" onClick={() => logout()}>
                <CiLogout />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
