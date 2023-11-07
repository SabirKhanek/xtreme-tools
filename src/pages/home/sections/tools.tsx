import { getResponsiveClasses } from "../../../shared/constants/getResponsiveClasses";
import ai from "../assets/ai.svg";
export interface ToolsSectionProps {
  className?: string;
}
export function ToolsSection({ className }: ToolsSectionProps) {
  return (
    <section className={`py-24 ${className}`}>
      <div className={`${getResponsiveClasses()}`}>
        <h1 className="text-black/70 font-semibold text-2xl">
          All in One Xtreme <span className="text-primary">Tools</span>
        </h1>
        <p className="break-words w-80 text-xs">
          To harness the power of this data, businesses need a comprehensive
          data management platform
        </p>
        <div className="flex justify-between gap-2 flex-wrap my-4">
          <ToolCard
            image={ai}
            header={"AI Content"}
            body="Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly"
          ></ToolCard>
          <ToolCard
            image={ai}
            header={"AI Content"}
            body="Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly"
          ></ToolCard>
          <ToolCard
            image={ai}
            header={"AI Content"}
            body="Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly"
          ></ToolCard>
        </div>
      </div>
    </section>
  );
}

function ToolCard({
  image,
  header,
  body,
}: {
  image: string;
  header: string;
  body: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(289deg, #58126A -40.56%, #F6B2E1 119.32%)`,
      }}
      className="w-80 h-72 p-7 flex flex-col rounded"
    >
      <img src={image} width={60} alt="" />
      <div className="mt-2">
        <h2 className="font-semibold text-lg text-white">{header}</h2>
        <p className="text-sm text-white font-light">{body}</p>
      </div>
    </div>
  );
}
