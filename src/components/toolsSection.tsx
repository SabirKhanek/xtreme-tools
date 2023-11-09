import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { ToolCard, ToolCardProps } from "./tool_card";
import decor_1 from "../assets/decor_1.svg";

export interface ToolsSection {
  className?: string;
  header: string;
  subtext: string;
  tools: ToolCardProps[];
  bgGradient?: boolean;
}

export function ToolSection({
  className,
  bgGradient,
  header,
  subtext,
  tools,
}: ToolsSection) {
  return (
    <section
      className={`py-24 ${
        bgGradient
          ? "bg-[linear-gradient(289deg,#58126A_-40.56%,#F6B2E1_119.32%)]"
          : "bg-white"
      } ${className}`}
    >
      <div className={`${getResponsiveClasses()} relative`}>
        {!bgGradient && (
          <div className="absolute right-0 top-0">
            <img src={decor_1} width={50} alt="" />
          </div>
        )}
        <div
          className={`ml-3 mb-5 ${bgGradient ? "text-white" : "text-black/70"}`}
        >
          <h1
            className={`${
              bgGradient ? "text-white" : "text-black/70"
            } font-semibold text-2xl`}
          >
            {header} <span className="text-primary">Tools</span>
          </h1>
          <p className="break-words w-80 text-xs">{subtext}</p>
        </div>
        <div className="grid xs:grid-cols-[repeat(2,minmax(200px,350px))] sm:justify-normal lg:grid-cols-[repeat(3,minmax(200px,350px))] xl:grid-cols-[repeat(4,minmax(200px,350px))] grid-cols-1 justify-center  gap-4 my-4">
          {tools.map((tool) => {
            return (
              <ToolCard
                image={tool.image}
                body={tool.body}
                header={tool.header}
                bgTransparent={bgGradient}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
