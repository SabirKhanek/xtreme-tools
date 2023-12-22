import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { getResponsiveClasses } from "../../shared/constants/getResponsiveClasses";
import { ToolsSidebar } from "./components/sidebar";
import { SubscribeSection } from "../home/sections/subscribe";
import { Footer } from "../../components/footer";
import { useEffect, useRef, useState } from "react";
import { useResponsive } from "../../shared/hooks/useResponsive";

export interface ToolsProps {
  className?: string;
}
export function Tools({ className }: ToolsProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const responsive = useResponsive();
  const navRef = useRef<HTMLDivElement>();
  const handleTouchStart = (e: any) => {
    setStartX(e.touches[0].clientX);
  };

  useEffect(() => {
    if (responsive.windowWidth >= 768) {
      if (isSidebarOpen) setSidebarOpen(false);
    }
  }, [responsive]);

  const handleTouchMove = (e: any) => {
    const currentX = e.touches[0].clientX;
    const difference = startX - currentX;
    if (responsive.windowWidth >= 768) return;
    if (difference > 50) {
      // Swipe left
      if (isSidebarOpen) {
        console.log("Bye");
        setSidebarOpen(false);
      }
    } else if (difference < -50) {
      // Swipe right
      if (!isSidebarOpen) {
        console.log("Hi");
        setSidebarOpen(true);
      }
    }
  };
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className={`relative ${className} `}
    >
      <Navbar ref={navRef} bgClassApplied={true} />
      <div
        className={`absolute top-0 left-0 transition-all duration-150 z-10 ${
          isSidebarOpen ? "left-0" : "-left-full"
        } bg-white`}
        style={{
          top: navRef.current?.clientHeight || 79.8,
          height: `calc(100vh - ${navRef.current?.clientHeight || 79.8}px)`,
        }}
      >
        <ToolsSidebar />
      </div>
      <div className={`${getResponsiveClasses()} mt-4`}>
        <div className="flex justify-between  gap-7 relative">
          <div className="basis-[280px] hidden md:block lg:shrink-0 grow-0">
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
