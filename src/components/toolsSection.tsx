import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { ToolCard, ToolCardProps } from "./tool_card";
import decor_1 from "../assets/decor_1.svg";
import tools_section_heading from "../assets/tools_section_heading.svg";
import ts_ssg_1 from "../assets/ts_ssg_1.svg";
import ts_ssg_2 from "../assets/tl_ssg_2.svg";
import tl_bc from "../assets/tl_bc.svg";
import bot_ssg1 from "../assets/bot_ssg1.svg";
import mail_letter from "../assets/mail.svg";
export interface ToolsSection {
  className?: string;
  header: string;
  subtext: string;
  id?: string;
  tools: ToolCardProps[];
  bgGradient?: boolean;
}

export function ToolSection({
  className,
  bgGradient,
  header,
  subtext,
  tools,
  id,
}: ToolsSection) {
  return (
    <section
      id={id || ""}
      className={`py-24 relative ${
        bgGradient
          ? "bg-[linear-gradient(289deg,#58126A_-40.56%,#F6B2E1_119.32%)]"
          : "bg-white "
      } ${className}`}
    >
      <img src={ts_ssg_1} className="absolute top-36 right-0" alt="" />
      <img src={mail_letter} className="absolute top-5 left-2" alt="" />
      <div className={`${getResponsiveClasses()} overflow-x-clip relative`}>
        {!bgGradient && (
          <div className="absolute right-0 top-0">
            <img src={decor_1} width={50} alt="" />
          </div>
        )}
        <div
          className={`ml-3 mb-5 relative flex-col inline-flex ${
            bgGradient ? "text-white" : "text-black/70"
          }`}
        >
          <h1
            className={`${
              bgGradient ? "text-white" : "text-black/70"
            } font-semibold text-2xl z-10`}
          >
            {header} <span className="text-primary">Tools</span>
          </h1>
          <p className="break-words w-80 text-xs z-10">{subtext}</p>
          <img
            src={tools_section_heading}
            className="absolute w-[140%] left-0"
            alt=""
          />
          {!bgGradient && (
            <img src={bot_ssg1} className="absolute -right-28 -top-4" alt="" />
          )}
        </div>
        <div className=" relative grid lm:grid-cols-[repeat(2,minmax(250px,350px))] sm:justify-normal md:grid-cols-[repeat(3,minmax(200px,350px))] xl:grid-cols-[repeat(3,minmax(200px,420px))] grid-cols-1 justify-center  gap-4 my-4">
          {tools.map((tool) => {
            return (
              <ToolCard
                className="z-10"
                image={tool.image}
                body={tool.body}
                header={tool.header}
                bgTransparent={bgGradient}
                href={tool.href}
                onClick={tool.onClick}
              />
            );
          })}
          {!bgGradient && (
            <div>
              <img
                src={ts_ssg_2}
                className="absolute -bottom-24 left-1/2"
                alt=""
              />
              <img
                src={tl_bc}
                className="absolute bottom-5 -right-20 z-0"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
