"use client";
import Image, { StaticImageData } from "next/image";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
export interface ToolCardProps {
  image: string | StaticImageData;
  header: string;
  body: string;
  className?: string;
  bgTransparent?: boolean;
  href?: string;
  onClick?: () => void;
}

export function ToolCard({
  image,
  header,
  body,
  bgTransparent,
  className,
  href,
  onClick,
}: ToolCardProps) {
  const router = useRouter();
  const getBgClass = () => {
    if (bgTransparent) {
      return "bg-transparent hover:bg-white/40";
    } else {
      return "hover:bg-[linear-gradient(289deg,#58126A_-40.56%,#F6B2E1_119.32%)]";
    }
  };
  const getTextClasses = () => {
    if (bgTransparent) {
      return "text-white";
    } else {
      return "group-hover:text-white text-black/70";
    }
  };
  return (
    <a
    
      className={`w-full group cursor-pointer ${getBgClass()} h-72 xl:h-[350px] p-7 flex flex-col rounded  transition-all duration-500 ease-in-out ${className} ${
        bgTransparent ? "border-[0.5px] border-white" : "shadow-md"
      }`}
      href={href}
    >
      <div className="min-h-[60px]">
        <Image src={image} width={60} height={60} alt="" />
      </div>
      <div className="mt-2 overflow-y-hidden">
        <h2 className={`font-semibold text-lg  ${getTextClasses()}`}>
          {header}
        </h2>
        <p className={`text-sm font-light ${getTextClasses()}`}>{body}</p>
      </div>
    </a>
  );
}
