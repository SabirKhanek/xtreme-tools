import { AuthTokenPayload, validateToken } from "@/app/shared/utils/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function AuthGuard(req?: NextRequest, allow_undefined = false) {
  const auth_token =
    cookies().get("x_auth")?.value || req?.cookies.get("x_auth")?.value;
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
