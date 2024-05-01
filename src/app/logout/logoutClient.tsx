"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export function LogoutClient({ _logout }: { _logout: any }) {
  useEffect(() => {
    _logout();
    localStorage.removeItem("jwt");
    window.location.replace("/");
  }, []);
  return null;
}
