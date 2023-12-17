import ss from "./assets/ss.png";
// import ss1 from "./assets/ss1.png";
import ss2 from "./assets/ss2.png";
import ss3 from "./assets/ss3.png";
import ss4 from "./assets/ss4.png";
import ss5 from "./assets/ss5.png";
import { ToolSection } from "../../../components/toolsSection";
export interface ToolsSectionProps {
  className?: string;
}
export function SEOToolsSection({ className }: ToolsSectionProps) {
  return (
    <ToolSection
      id="seo_tools"
      className={className}
      tools={tools}
      header="Free SEO"
      subtext="To harness the power of this data, businesses need a comprehensive
            data management platform"
      bgGradient={true}
    />
  );
}

const tools = [
  {
    image: ss,
    header: "Keyword Research Tool",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/tools/seo/keyword_research",
  },
  // {
  //   image: ss1,
  //   header: "Bulk Keyword Tool",
  //   body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
  // },
  {
    image: ss2,
    header: "Questions People Ask Tool",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/tools/seo/people_also_ask",
  },
  {
    image: ss3,
    header: "Backlinks Checker",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/tools/seo/backlinks_checker",
  },
  {
    image: ss4,
    header: "Competitors Keywords Research",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/tools/seo/competitors_keyword_research",
  },
  {
    image: ss5,
    header: "Domain Authority Checker",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/tools/seo/domain_authority_checker",
  },
];
