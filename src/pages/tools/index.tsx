import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { getResponsiveClasses } from "../../shared/constants/getResponsiveClasses";
import { ToolsSidebar } from "./components/sidebar";

export interface ToolsProps {
  className?: string;
}
export function Tools({ className }: ToolsProps) {
  return (
    <div className={`${className} `}>
      <Navbar bgClassApplied={true} />
      <div className={`${getResponsiveClasses()} mt-4`}>
        <div className="flex justify-between  gap-7">
          <div className="basis-[280px] shrink-0">
            <ToolsSidebar />
          </div>
          <div className="grow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
