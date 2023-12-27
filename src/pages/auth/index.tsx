import { Link, Outlet, useNavigate } from "react-router-dom";
import auth_1 from "./assets/auth_1.svg";
import tr_circle from "./assets/tr_cirle.svg";
import auth_2 from "./assets/auth_2.svg";
import { useAuth } from "../../shared/contexts/auth";
import { useEffect } from "react";
export interface AuthProps {
  className?: string;
}
export function Auth({ className }: AuthProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.authDetails.isLoggedIn) navigate("/");
  }, []);
  return (
    <div className={`relative bg-[#FCFCFC] grow ${className}`}>
      <img
        className="absolute left-5 bottom-10 hidden sm:inline scale-[60%] md:scale-75 lg:scale-90"
        src={auth_1}
        alt=""
      />
      <img
        className="absolute right-0 bottom-0 hidden sm:inline scale-[60%] md:scale-75 lg:scale-90"
        src={auth_2}
        alt=""
      />
      <div className="mx-auto my-0 flex z-10 flex-col gap-10 w-full min-h-screen justify-center items-center max-w-2xl">
        <Link to="/">
          <img src="/logo.svg" alt="" />
        </Link>
        <Outlet />
      </div>
      <img
        className="absolute pointer-events-none z-0 top-0 right-0 "
        src={tr_circle}
        alt=""
      />
    </div>
  );
}
