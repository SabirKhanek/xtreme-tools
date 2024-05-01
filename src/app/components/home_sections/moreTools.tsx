import prisma from "@/app/shared/prisma";
import { ToolSection } from "./toolsSection";

export async function MoreToolsSection() {
  const toolsDb = await prisma.admin_tools.findMany();
  const tools = toolsDb.map((t) => ({
    image: `https://admin.xtreme.tools/images/blog/${t.img}`,
    header: t.title!,
    body: t.description!,
    href: t.url!,
  }));
  return (
    <ToolSection
      className="mb-16"
      tools={tools}
      id="more_tools"
      header="More Tools"
      subtext="Some more xtreme tools to help you"
      bgGradient={true}
    />
  );
}
