"use client";

import { Button } from "@/app/components/button";
import { useState } from "react";

export function UpdatePlanButton({
  doUpdate,
  planId,
  current,
}: {
  doUpdate: any;
  planId: string;
  current: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  async function DoUpdate() {
    console.log("Hi");
    setIsLoading(true);
    try {
      if (!current) await doUpdate(planId);
    } catch (err: any) {
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
