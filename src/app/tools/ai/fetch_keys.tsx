"use server";
import { AuthGuard } from "@/app/api/shared";
import prisma from "@/app/shared/prisma";

export const fetchKeysName = async () => {
  const auth = AuthGuard();
  if (!auth?.uid) return "";
  const isAPIKey = await prisma.user_integrated_api_keys.findMany({
    where: { user_uid: auth.uid },
  });
  return isAPIKey.map((v) => v.name).join(", ");
};
