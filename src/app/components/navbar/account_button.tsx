"use client";

import { useAuth } from "@/app/shared/contexts/auth";
import Link from "next/link";
import { Button } from "../button";
import { AiOutlineUser } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { CiLogout, CiSettings } from "react-icons/ci";
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
              <Link className="flex gap-2 items-center" href={"/settings"}>
                <CiSettings />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex gap-2 items-center"
                href={"/subscription-plan"}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1335 12.6533H4.8668C4.5868 12.6533 4.27347 12.4333 4.18013 12.1666L1.42013 4.44664C1.0268 3.33997 1.4868 2.99997 2.43347 3.67997L5.03347 5.53997C5.4668 5.83997 5.96013 5.68664 6.1468 5.19997L7.32013 2.0733C7.69347 1.0733 8.31347 1.0733 8.6868 2.0733L9.86013 5.19997C10.0468 5.68664 10.5401 5.83997 10.9668 5.53997L13.4068 3.79997C14.4468 3.0533 14.9468 3.4333 14.5201 4.63997L11.8268 12.18C11.7268 12.4333 11.4135 12.6533 11.1335 12.6533Z"
                    stroke="#4D4D4D"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.33398 14.6667H11.6673"
                    stroke="#4D4D4D"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.33398 9.33331H9.66732"
                    stroke="#4D4D4D"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>Membership Plan</span>
              </Link>
            </li>
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
