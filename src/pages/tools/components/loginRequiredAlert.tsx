import { Link } from "react-router-dom";

export interface LoginRequiredAlertProps {
  className?: string;
}
export function LoginRequiredAlert({ className }: LoginRequiredAlertProps) {
  return (
    <div className={`${className}`}>
      <div role="alert" className="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          Login is required to use this tool.{" "}
          <Link className="text-primary hover:underline" to="/login">
            Login here.
          </Link>
        </span>
      </div>
    </div>
  );
}
