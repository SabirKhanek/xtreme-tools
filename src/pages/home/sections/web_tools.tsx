import wt1 from "./assets/wt1.png";
import wt2 from "./assets/wt2.png";
import wt3 from "./assets/wt3.png";
import wt4 from "./assets/wt4.png";
import wt5 from "./assets/wt5.png";
import wt6 from "./assets/wt6.png";
import { ToolSection } from "../../../components/toolsSection";
export interface ToolsSectionProps {
  className?: string;
}
export function WebToolsSection({ className }: ToolsSectionProps) {
  return (
    <ToolSection
      className={className}
      tools={tools}
      header="Free Web"
      subtext="To harness the power of this data, businesses need a comprehensive
            data management platform"
      bgGradient={false}
    />
  );
}
const tools = [
  {
    image: wt1,
    header: "Free Favicon Generator",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: wt2,
    header: "Secure Password Generator",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/tools/web/secure_password_generator",
  },
  {
    image: wt3,
    header: "Privacy Policy Generator",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/tools/web/privacy_policy_generator",
  },
  {
    image: wt4,
    header: "TOC Generator",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/tools/web/toc_generator",
  },
  {
    image: wt5,
    header: "Responsive Checker",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
  {
    image: wt6,
    header: "SSL Checker",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  },
];
