import ai1 from "./assets/ai1.png";
import ai2 from "./assets/ai2.png";
import ai3 from "./assets/ai3.png";
import ai4 from "./assets/ai4.png";
import ai5 from "./assets/ai5.png";
import ai6 from "./assets/ai6.png";
import { ToolSection } from "../../../components/toolsSection";
export interface ToolsSectionProps {
  className?: string;
}
export function AIToolsSection({ className }: ToolsSectionProps) {
  return (
    <ToolSection
      className={className}
      tools={tools}
      header="Free AI"
      subtext="To harness the power of this data, businesses need a comprehensive
            data management platform"
      bgGradient={true}
    />
  );
}

const tools = [
  {
    image: ai1,
    header: "Free AI Writer",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: ai2,
    header: "Free Paragraph Rewriter",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: ai3,
    header: "Free Outline Generator",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: ai4,
    header: "AI Paragraph Translator",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: ai5,
    header: "AI Character Generator",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: ai6,
    header: "AI Design Tools",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
];
