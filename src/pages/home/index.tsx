import { Footer } from "../../components/footer";
import { AIToolsSection } from "./sections/ai_tools";
import { EmailMarketingToolsSection } from "./sections/email_marketing_tools";
import { HeroSection } from "./sections/hero";
import { SEOToolsSection } from "./sections/seo_tools";
import { ToolsSection } from "./sections/tools";
import { WebToolsSection } from "./sections/web_tools";

export interface HomePageProps {
  className?: string;
}
export function HomePage({ className }: HomePageProps) {
  return (
    <div
      className={`${"getResponsiveClasses()"} ${
        className || ""
      } flex-grow w-full`}
    >
      <HeroSection />
      <ToolsSection />
      <SEOToolsSection />
      <EmailMarketingToolsSection />
      <AIToolsSection />
      <WebToolsSection />
      <Footer />
    </div>
  );
}
