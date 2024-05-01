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

export default function Home() {
  return (
    <div className={`flex-grow w-full`}>
      <HeroSection />
      <ToolsSection />
      <SEOToolsSection />
      <EmailMarketingToolsSection />
      <AIToolsSection />
      <WebToolsSection />
      <MoreToolsSection />
      <SubscribeSection />
      <Footer />
    </div>
  );
}
