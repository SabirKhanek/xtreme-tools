import em1 from "./assets/em1.png";
import em2 from "./assets/em2.png";
import em3 from "./assets/em3.png";
import em4 from "./assets/em4.png";
import em5 from "./assets/em5.png";
import em6 from "./assets/em6.png";
import { ToolSection } from "../../../components/toolsSection";
export interface ToolsSectionProps {
  className?: string;
}
export function EmailMarketingToolsSection({ className }: ToolsSectionProps) {
  return (
    <ToolSection
      className={className}
      tools={tools}
      header="Free Email Marketing"
      subtext="To harness the power of this data, businesses need a comprehensive
            data management platform"
      bgGradient={false}
    />
  );
}

const tools = [
  {
    image: em1,
    header: "Free Email Checker",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: em2,
    header: "Bulk Email Verifier",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: em3,
    header: "Email Data Append Tool",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: em4,
    header: "Email Text Extraction",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/tools/email_marketing/email_extractor",
  },
  {
    image: em5,
    header: "Subject Line Tester",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: em6,
    header: "SMTP Tester",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
];
