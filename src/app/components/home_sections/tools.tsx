"use client";
import ai from "@/app/assets/ai.svg";
import { ToolSection as Tools } from "./toolsSection";
import email from "@/app/assets/email.png";
import seo from "@/app/assets/seo.png";
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
    href: "/#ai_tools",
  },
  {
    image: email,
    header: "Email Marketing",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/#email_marketing_tools",
  },
  {
    image: seo,
    header: "SEO & Traffic",
    body: "Empowering innovation, free of cost. Unleash your potential with our invaluable free tools. Elevate your projects effortlessly",
    href: "/#seo_tools",
  },
];
