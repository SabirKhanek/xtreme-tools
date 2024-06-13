import { cookies } from "next/headers";
import { AuthTokenPayload, validateToken } from "./utils/jwt";
import { redirect } from "next/navigation";

export function getAuthUser(allow_undefined = false) {
  const auth_token = cookies().get("x_auth")?.value;
  try {
    return validateToken<AuthTokenPayload>(auth_token as string);
  } catch (err) {
    if (allow_undefined) {
      return;
    } else {
      redirect("/login");
    }
  }
}
