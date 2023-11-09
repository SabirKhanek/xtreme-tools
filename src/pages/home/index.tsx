import { Footer } from "../../components/footer";
import { HeroSection } from "./sections/hero";
import { ToolsSection } from "./sections/tools";

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
      <Footer />
    </div>
  );
}
