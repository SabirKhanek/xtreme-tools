"use client";
import { useAuth } from "@/app/shared/contexts/auth";
import prisma from "@/app/shared/prisma";
import { useCookies } from "next-client-cookies";
import { ReactNode, useEffect, useState } from "react";
import { fetchKeysName } from "./fetch_keys";

export default function AIPageLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  const [keys_name, setKeysName] = useState("");

  useEffect(() => {
    fetchKeysName()
      .then((v) => {
        setKeysName(v);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {keys_name && (
        <div className={` my-5`}>
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              You have configured API keys for: {keys_name}. Usage charge will not be incurred
              if you opt for them!
            </span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
