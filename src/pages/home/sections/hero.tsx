import { Button } from "../../../components/button";
import { getResponsiveClasses } from "../../../shared/constants/getResponsiveClasses";
import { Navbar } from "../../../components/navbar";
export interface HeroSectionProps {
  className?: string;
}
export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(289deg, #58126A -40.56%, #F6B2E1 119.32%)`,
      }}
      className={`${className}`}
    >
      <Navbar />
      <div className={`${getResponsiveClasses()} py-24`}>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-col items-center max-w-[570px] gap-3">
            <h1 className="uppercase text-primary font-semibold">
              Empowering Innovation
            </h1>
            <h2 className="text-white font-semibold text-5xl break-words">
              Powerful Solutions For The Enterprise
            </h2>
            <p className="text-black/70 break-words">
              Are you yeady to take your projects to new heights? At Xtreme
              Tool, we're dedicated to empowering innovation and unleashing your
              potential.
            </p>
            <div className="flex items-center justify-center gap-5">
              <Button className="bg-primary border-transparent border">
                Get Started
              </Button>
              <Button className="border">Pricing plans</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
