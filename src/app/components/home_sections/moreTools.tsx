import prisma from "@/app/shared/prisma";
import { ToolSection } from "./toolsSection";
import { ToolCardProps } from "./tool_card";

export async function MoreToolsSection({ tools }: { tools: ToolCardProps[] }) {
  return (
    <ToolSection
      className="mb-16"
      tools={tools}
      id="more_tools"
      header="More"
      subtext="Some more xtreme tools to help you"
      bgGradient={true}
    />
  );
}
