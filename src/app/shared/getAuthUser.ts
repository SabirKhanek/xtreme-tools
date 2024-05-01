import { cookies } from "next/headers";
import { AuthTokenPayload, validateToken } from "./utils/jwt";
import { redirect } from "next/navigation";

export function getAuthUser() {
  const auth_token = cookies().get("x_auth")?.value;
  let payload;
  try {
    payload = validateToken<AuthTokenPayload>(auth_token as string);
  } catch (err) {
    redirect("/logout");
  }
  return payload as AuthTokenPayload;
}
