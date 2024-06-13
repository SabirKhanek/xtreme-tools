"use client";

import { CreateSessionResponse } from "@/app/api/payments/checkout/route";
import { Button } from "@/app/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function UpdatePlanButton({
  planId,
  current,
}: {
  planId: string;
  current: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function DoUpdate() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/payments/checkout?plan=${planId}`, {
        method: "GET",
        credentials: "include",
      });
      const resp = (await res.json()) as CreateSessionResponse;
      if (resp.success) {
        window.open(resp.data.checkout_url, "_blank")?.focus();
      } else {
        if (res.status === 401) {
          router.push("/login");
        } else {
          toast(resp.message || "Unknown error");
        }
      }
    } catch (err: any) {
      toast(err.message || "unknown error");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button
      className={`w-full bg-primary ${current && "bg-primary/60"}`}
      disabled={current}
      isLoading={isLoading}
      onClick={() => DoUpdate()}
    >
      {current ? "Your current plan" : "Get Started"}
    </Button>
  );
}
