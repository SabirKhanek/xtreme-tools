import Image from "next/image";
import { HeroSection } from "./components/home_sections/hero";
import { ToolsSection } from "./components/home_sections/tools";
import { SEOToolsSection } from "./components/home_sections/seo_tools";
import { EmailMarketingToolsSection } from "./components/home_sections/email_marketing_tools";
import { AIToolsSection } from "./components/home_sections/ai_tools";
import { WebToolsSection } from "./components/home_sections/web_tools";
import { SubscribeSection } from "./components/home_sections/subscribe";
import { Footer } from "./components/footer";
import { MoreToolsSection } from "./components/home_sections/moreTools";
import prisma from "./shared/prisma";
import { ToolCardProps } from "./components/home_sections/tool_card";

export default async function Home() {
  let tools: ToolCardProps[] = [];
  try {
    fetch("https://api.xtreme.tools", { cache: "no-cache" });
    const toolsDb = await prisma.admin_tools.findMany();
    tools = toolsDb.map((t) => ({
      image: `https://admin.xtreme.tools/images/tools/${t.img}`,
      header: t.title!,
      body: t.description!,
      href: t.url!,
    }));
  } catch (err) {}

  return (
    <div className={`flex-grow w-full`}>
      <HeroSection />
      <ToolsSection />
      <SEOToolsSection />
      <EmailMarketingToolsSection />
      <AIToolsSection />
      <WebToolsSection />
      {tools.length > 0 && <MoreToolsSection tools={tools} />}
      <SubscribeSection />
      <Footer />
    </div>
  );
}
