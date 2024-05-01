"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function PlanUpdated({ currentPlanName }: { currentPlanName: string }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("planUpdatedStatus") === "success")
      toast.success(`Enjoy our ${currentPlanName} plan!`);
    else if (searchParams.get("planUpdatedStatus") === "failure") {
      toast.error("There was an unknown error while updating your plan!");
    }
  });
  return null;
}
