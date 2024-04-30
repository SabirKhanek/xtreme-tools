"use client";

import prisma from "@/app/shared/prisma";
import { useEffect } from "react";

export function AppendView({
  id,
  increment,
}: {
  id: bigint;
  increment: (id: bigint) => Promise<void>;
}) {
  useEffect(() => {
    setTimeout(() => {
      increment(id);
    }, 10000);
  }, []);
  return null;
}
