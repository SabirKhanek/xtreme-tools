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

const tools = [
  {
    image: ai,
    header: "AI Content",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: email,
    header: "Email Marketing",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: seo,
    header: "SEO & Traffic",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
];
