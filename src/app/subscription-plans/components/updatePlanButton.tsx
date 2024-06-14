"use client";

import { SwitchPlan } from "@/app/actions/subscriptions";
import { CreateSessionResponse } from "@/app/api/payments/checkout/route";
import { Button } from "@/app/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function UpdatePlanButton({
  planId,
  current,
  isUpgrade = false,
}: {
  planId: string;
  current: boolean;
  isUpgrade: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleGetStarted() {
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
  async function handleSwitchPlan() {
    setIsLoading(true);
    try {
      const res = await SwitchPlan(planId);

      if (res.success) {
        toast(res.message);
        setTimeout(() => {
          router.refresh();
        }, 1500);
      } else {
        if (res.message === "unauthorized") {
          router.push("/login");
        } else {
          toast(res.message || "Unknown error");
        }
      }
    } catch (err: any) {
      toast(err.message || "unknown error");
    } finally {
      setIsLoading(false);
    }
  }
  async function DoUpdate() {
    if (isUpgrade) {
      handleSwitchPlan();
    } else {
      handleGetStarted();
    }
  }
  return (
    <Button
      className={`w-full bg-primary ${current && "bg-primary/60"}`}
      disabled={current || isLoading}
      isLoading={isLoading}
      onClick={() => !isLoading && DoUpdate()}
    >
      {current
        ? "Your current plan"
        : isUpgrade
        ? "Switch Plan"
        : "Get Started"}
    </Button>
  );
}
