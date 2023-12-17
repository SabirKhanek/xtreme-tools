import ai from "../assets/ai.svg";
import { ToolSection as Tools } from "../../../components/toolsSection";
import email from "./assets/email.png";
import seo from "./assets/seo.png";
export interface ToolsSectionProps {
  className?: string;
}
export function ToolsSection({ className }: ToolsSectionProps) {
  return (
    <Tools
      tools={tools}
      header="All in One Xtreme"
      subtext="To harness the power of this data, businesses need a comprehensive
            data management platform"
      className={className}
    />
  );
}

const scrollToId = (id: string) => {
  // element which needs to be scrolled to
  const element = document.querySelector(`#${id}`);

  // scroll to element
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const tools = [
  {
    image: ai,
    header: "AI Content",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    onClick: () => {
      scrollToId("ai_tools");
    },
  },
  {
    image: email,
    header: "Email Marketing",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    onClick: () => {
      scrollToId("email_marketing_tools");
    },
  },
  {
    image: seo,
    header: "SEO & Traffic",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    onClick: () => {
      scrollToId("seo_tools");
    },
  },
];
