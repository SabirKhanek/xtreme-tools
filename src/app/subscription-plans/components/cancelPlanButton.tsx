"use client";

import {
  CancelUserSubscription,
  ResubscribeUserSubscription,
} from "@/app/actions/subscriptions";
import { CreateSessionResponse } from "@/app/api/payments/checkout/route";
import { Button } from "@/app/components/button";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

export function CancelPlanButton({ cancel_at }: { cancel_at?: Date | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const scheduledToCancel = useMemo(
    () => (cancel_at ? true : false),
    [cancel_at]
  );
  async function handleDelete() {
    setIsLoading(true);
    try {
      const res = await CancelUserSubscription();
      if (res.success) {
        toast(
          `Your subscription is scheduled to be cancelled ${
            res.data?.cancel_at
              ? `at: ${new Date(res.data.cancel_at).toDateString()}`
              : ""
          }`
        );
        router.refresh();
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

  async function handleResubscribe() {
    setIsLoading(true);
    try {
      const res = await ResubscribeUserSubscription();
      if (res.success) {
        toast(res.message);
        router.refresh();
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
  async function DoAction() {
    if (scheduledToCancel) {
      handleResubscribe();
    } else {
      handleDelete();
    }
  }
  return (
    <Button
      className={`w-full ${scheduledToCancel ? "bg-green-500" : "bg-red-500"}`}
      isLoading={isLoading}
      disabled={isLoading}
      onClick={() => !isLoading && DoAction()}
    >
      {scheduledToCancel ? `Resubscribe` : "Cancel Subscription"}
    </Button>
  );
}
