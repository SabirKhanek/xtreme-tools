import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export interface ToastRouteProps {
  message: string;
  to?: string;
  error?: boolean;
}
export function ToastRoute({ message, to, error }: ToastRouteProps) {
  const navigate = useRouter();
  useEffect(() => {
    if (error) toast.error(message);
    else toast.success(message);
    navigate.push(to || "/");
  }, []);
  return null;
}
