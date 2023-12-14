import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface ToastRouteProps {
  message: string;
  to?: string;
  error?: boolean;
}
export function ToastRoute({ message, to, error }: ToastRouteProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (error) toast.error(message);
    else toast.success(message);
    navigate(to || "/");
  }, []);
  return null;
}
