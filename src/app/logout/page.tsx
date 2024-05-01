import { cookies } from "next/headers";
import { LogoutClient } from "./logoutClient";

async function _logout() {
  "use server";
  cookies().delete("x_auth");
  return { msg: "logout" };
}

export default function Logout() {
  return <LogoutClient _logout={_logout} />;
}
