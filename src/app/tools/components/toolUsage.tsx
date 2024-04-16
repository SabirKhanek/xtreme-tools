import { useEffect, useState } from "react";
import { useAuth } from "@/app/shared/contexts/auth";
import { getToolUsage } from "@/app/services/tools";
import { toast } from "react-toastify";

export interface ToolUsageProps {
  className?: string;
  toolId: string;
  usage: { used: number; quota: number };
  setUsage: (v: ToolUsageProps["usage"]) => void;
}
export function ToolUsage({
  className,
  usage,
  setUsage,
  toolId,
}: ToolUsageProps) {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const toolUsage = await getToolUsage(toolId);
        if (toolUsage?.data) {
          setUsage({ used: toolUsage.data.usage, quota: toolUsage.data.quota });
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
      setIsLoading(false);
    };
    if (auth.authDetails.isLoggedIn) getData();
  }, []);
  if (!auth.authDetails.isLoggedIn) return null;

  return (
    <div className={`${className} w-full flex flex-col gap-2`}>
      <h3 className="text-primary text-xl font-medium">Tool Usage:</h3>
      {!isLoading && (
        <div className="h-4 rounded-3xl w-full bg-[#F2AEDE26] overflow-hidden">
          <div
            style={{ width: `${(usage.used / usage.quota) * 100}%` }}
            className="bg-primary h-full"
          ></div>
        </div>
      )}
      {isLoading && (
        <progress className="progress progress-primary w-full"></progress>
      )}
      <p>remaining operations today: {usage.quota - usage.used}</p>
    </div>
  );
}
