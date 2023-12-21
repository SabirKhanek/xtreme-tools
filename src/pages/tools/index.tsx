import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { getResponsiveClasses } from "../../shared/constants/getResponsiveClasses";
import { ToolsSidebar } from "./components/sidebar";
import { SubscribeSection } from "../home/sections/subscribe";
import { Footer } from "../../components/footer";

export interface ToolsProps {
  className?: string;
}
export function Tools({ className }: ToolsProps) {
  return (
    <div className={`${className} `}>
      <Navbar bgClassApplied={true} />
      <div className={`${getResponsiveClasses()} mt-4`}>
        <div className="flex justify-between  gap-7">
          <div className="basis-[280px] hidden lg:block lg:shrink-0 grow-0">
            <ToolsSidebar />
          </div>
          <div className="grow">
            <Outlet />
          </div>
        </div>
      </div>
      <SubscribeSection className="mt-10" />
      <Footer />
    </div>
  );
}
