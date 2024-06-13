"use client";

import { getUserSubscription } from "@/app/actions/subscriptions";
import { LoadingSplash } from "@/app/components/loading_splash";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export function PlanUpdated({ user_id }: { user_id?: number }) {
  const searchParams = useSearchParams();
  const [polling, setPolling] = useState(false);
  const started = useRef(Date.now());
  const router = useRouter();

  const checkPaymentStatus = async () => {
    if (Date.now() - started.current > 60 * 1000) {
      setPolling(false);
      toast(
        "Couldn't verify the payment: It seems that the transaction failed"
      );
      return;
    }

    try {
      const result = await getUserSubscription();
      if (result.success) {
        toast.success(`Enjoy our services 🎉!`);
        setPolling(false);
        setTimeout(() => router.push("/subscription-plans"), 1000);
      }
    } catch (err: any) {
      toast.error(
        err.message || "Something went wrong while checking the payment"
      );
      setPolling(false);
      setTimeout(() => router.push("/subscription-plans"), 1000);
    }
  };

  useEffect(() => {
    if (polling) {
      const interval = setInterval(checkPaymentStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [polling]);

  useEffect(() => {
    if (searchParams.get("checkout_result") === "success" && user_id) {
      setPolling(true);
    }
  }, [searchParams, user_id]);

  if (polling) {
    return <LoadingSplash message="Verifying Payment Status" />;
  }

  return null;
}
