"use client";
import { useCookies } from "next-client-cookies";
import { useAuth } from "../shared/contexts/auth";
import { LoginRequiredAlert } from "../tools/components/loginRequiredAlert";

export interface ToolBodyProps {
  className?: string;
  ToolDescription?: React.FC<any>;
  children: React.ReactNode;
  heading: string;
  isLoggedIn?: boolean;
  subheading: string;
  requireLogin?: boolean;
}
export function ToolBody({
  className,
  ToolDescription,
  children,
  heading,
  subheading,

  requireLogin,
}: ToolBodyProps) {
  const auth = useAuth();
  const isLoggedIn = useCookies().get("x_auth") ? true : false;
  return (
    <div className={`${className}`}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">{heading}</h1>
        <p className="text-sm text-black/70 my-2">{subheading}</p>
      </div>
      {(requireLogin ? isLoggedIn || auth.authDetails.isLoggedIn : true) && (
        <div
          className={`w-full border border-black rounded-xl p-6 ${className}`}
        >
          {children}
        </div>
      )}
      {!(requireLogin ? isLoggedIn || auth.authDetails.isLoggedIn : true) && (
        <LoginRequiredAlert />
      )}
      <div className="w-full border border-black rounded-xl p-6 my-5">
        {ToolDescription && <ToolDescription />}
        <span className="text-black/70 font-semibold text-lg">
          <span className="text-primary">Contact Us </span>
          <span>
            for suggestions, complaints, or just feedback without hesitation.
          </span>
        </span>
      </div>
    </div>
  );
}
