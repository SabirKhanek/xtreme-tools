import { Outlet } from "react-router-dom";
import auth_1 from "./assets/auth_1.svg";
import tr_circle from "./assets/tr_cirle.svg";
import auth_2 from "./assets/auth_2.svg";
export interface AuthProps {
  className?: string;
}
export function Auth({ className }: AuthProps) {
  return (
    <div className={`relative bg-[#FDFDFD] grow ${className}`}>
      <img className="absolute top-0 right-0 " src={tr_circle} alt="" />
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
      <div className="mx-auto my-0 flex flex-col gap-6 w-full min-h-screen justify-center items-center max-w-2xl">
        <img src="/logo.svg" alt="" />
        <Outlet />
      </div>
    </div>
  );
}
