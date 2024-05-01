import { Navbar } from "@/app/components/navbar";
import { getResponsiveClasses } from "@/app/shared/constants/getResponsiveClasses";
import { Footer } from "@/app/components/footer";
import { SubscribeSection } from "../components/home_sections/subscribe";
import Link from "next/link";

export default function ToolsPageLayout({
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
            <>
              <ul className="flex gap-2 items-center">
                <li className="hover:text-primary hover:underline hover:font-semibold">
                  <Link href={"/"}>Home</Link>
                </li>
                <span> &gt; </span>
                <li className="hover:text-primary hover:underline hover:font-semibold">
                  <Link href={"/blogs"}>Blogs</Link>
                </li>
              </ul>
              {children}
            </>
          </div>
        </div>
      </div>
      <SubscribeSection className="mt-10" />
      <Footer />
    </div>
  );
}
