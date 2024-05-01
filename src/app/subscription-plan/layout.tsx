import { Navbar } from "@/app/components/navbar";
import { getResponsiveClasses } from "@/app/shared/constants/getResponsiveClasses";
import { Footer } from "@/app/components/footer";
import { SubscribeSection } from "../components/home_sections/subscribe";
import Link from "next/link";

export default function SubscriptionPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`relative  `}>
      <Navbar bgClassApplied={true} />

      <div className={`${"responsive"} mt-4`}>
        <div className="flex justify-between  gap-7 relative">
          <div className="grow py-3">
            <>{children}</>
          </div>
        </div>
      </div>
      <SubscribeSection className="mt-10" />
      <Footer />
    </div>
  );
}
