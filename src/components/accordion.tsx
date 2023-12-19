import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
export interface AccordionProps {
  className?: string;
  title: string;
  titleStatus?: React.ReactNode;
  children: React.ReactNode;
}
export function Accordion({
  className,
  title,
  children,
  titleStatus,
}: AccordionProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`w-full border-b border-[#DADADA] my-5 ${className}`}>
      <div
        className={`flex p-3 items-center transition-colors duration-200 gap-3 ${
          collapsed ? "bg-primary" : "bg-white"
        }`}
      >
        <div className="p-1 border border-[#DADADA] rounded-full">
          <div
            className={`${
              collapsed ? "bg-[#9758DA]" : "bg-primary"
            } text-white  flex justify-center items-center rounded-full p-1 cursor-pointer`}
            onClick={() => setCollapsed(!collapsed)}
          >
            {!collapsed ? <FaPlus /> : <FaMinus />}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h2
            className={`text-lg break-words font-bold ${
              collapsed ? "text-white" : "text-black/70"
            }`}
          >
            {title}
          </h2>
          {titleStatus}
        </div>
      </div>
      <div
        className={`max-h-[1000px]  transition-all duration-200 ease-in-out overflow-hidden h-fit ${
          !collapsed ? "!max-h-0" : "border-t-[1px] border-bdr"
        }`}
      >
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
