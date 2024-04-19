"use client";
import { useAuth } from "../shared/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import auth_1 from "./assets/auth_1.svg";
import tr_circle from "./assets/tr_cirle.svg";
import auth_2 from "./assets/auth_2.svg";
import Link from "next/link";
import Image from "next/image";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = useAuth();
  const navigate = useRouter();
  useEffect(() => {
    if (auth.authDetails.isLoggedIn) navigate.push("/");
  }, []);
  return (
    <div className={`relative bg-[#FCFCFC] grow`}>
      <Image
        className="absolute left-5 bottom-10 hidden sm:inline scale-[60%] md:scale-75 lg:scale-90"
        src={auth_1}
        alt=""
      />
      <Image
        className="absolute right-0 bottom-0 hidden sm:inline scale-[60%] md:scale-75 lg:scale-90"
        src={auth_2}
        alt=""
      />
      <div className="mx-auto my-0 flex z-10 flex-col gap-10 w-full min-h-screen justify-center items-center max-w-2xl">
        <Link href="/">
          <img src="/logo.svg" alt="" />
        </Link>
        {children}
      </div>
      <img
        className="absolute pointer-events-none z-0 top-0 right-0 "
        src={tr_circle}
        alt=""
      />
    </div>
  );
}
