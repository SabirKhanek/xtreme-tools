import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export interface ToolCardProps {
  image: string;
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
  const navigate = useNavigate();
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
    <div
      className={`w-full group cursor-pointer ${getBgClass()} h-72 xl:h-[350px] p-7 flex flex-col rounded  transition-all duration-500 ease-in-out ${className} ${
        bgTransparent ? "border-[0.5px] border-white" : "shadow-md"
      }`}
      onClick={() => {
        if (onClick) {
          onClick();
          return;
        }
        if (!href) toast("Tool not implemented yet!");
        else navigate(href);
      }}
    >
      <div className="min-h-[60px]">
        <img src={image} width={60} alt="" />
      </div>
      <div className="mt-2 overflow-y-hidden">
        <h2 className={`font-semibold text-lg  ${getTextClasses()}`}>
          {header}
        </h2>
        <p className={`text-sm font-light ${getTextClasses()}`}>{body}</p>
      </div>
    </div>
  );
}
