import wt1 from "@/app/assets/wt1.png";
import wt2 from "@/app/assets/wt2.png";
import wt3 from "@/app/assets/wt3.png";
import wt4 from "@/app/assets/wt4.png";
import wt5 from "@/app/assets/wt5.webp";
import wt6 from "@/app/assets/wt6.png";
import { ToolSection } from "./toolsSection";
export interface ToolsSectionProps {
  className?: string;
}
export function WebToolsSection({ className }: ToolsSectionProps) {
  return (
    <ToolSection
      className={className}
      tools={tools}
      id="web_tools"
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
    href: "/tools/web/favicon_generator",
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
    header: "Image Compressor",
    body: "Optimize your images with our free Image Compressor. Enhance your project efficiency and save storage space effortlessly.",
    href: "/tools/web/image-compressor",
  },
  {
    image: wt6,
    header: "PDF to DOCX Converter",
    body: "Convert PDFs to DOCX format seamlessly with our free PDF to DOCX Converter. Simplify your document management and editing process.",
    href: "/tools/web/pdf-converter",
  },
];
