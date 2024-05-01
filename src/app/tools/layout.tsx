"use client";
import { Navbar } from "@/app/components/navbar";
import { getResponsiveClasses } from "@/app/shared/constants/getResponsiveClasses";
import { Footer } from "@/app/components/footer";
import { useEffect, useRef, useState } from "react";
import { useResponsive } from "@/app/shared/hooks/useResponsive";
import { SubscribeSection } from "../components/home_sections/subscribe";
import { BsGlobe2 } from "react-icons/bs";
import { LuBarChart2 } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FaMicrochip } from "react-icons/fa";
import { Sidebar } from "../components/sidebar";

export default function ToolsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const responsive = useResponsive();
  const navRef = useRef<HTMLDivElement>();
  const handleTouchStart = (e: any) => {
    setStartX(e.touches[0].clientX);
  };

  useEffect(() => {
    if (responsive.windowWidth >= 768) {
      if (isSidebarOpen) setSidebarOpen(false);
    }
  }, [responsive]);

  const handleTouchMove = (e: any) => {
    const currentX = e.touches[0].clientX;
    const difference = startX - currentX;
    if (responsive.windowWidth >= 768) return;
    if (difference > 50) {
      // Swipe left
      if (isSidebarOpen) {
        console.log("Bye");
        setSidebarOpen(false);
      }
    } else if (difference < -50) {
      // Swipe right
      if (!isSidebarOpen) {
        setSidebarOpen(true);
      }
    }
  };
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className={`relative  `}
    >
      <Navbar _ref={navRef} bgClassApplied={true} />
      <div
        className={`absolute top-0 transition-all duration-150 z-10 ${
          isSidebarOpen ? "left-0" : "-left-full"
        } bg-white`}
        style={{
          top: navRef.current?.clientHeight || 79.8,
          height: `calc(100% - ${navRef.current?.clientHeight || 79.8}px)`,
        }}
      >
        <Sidebar
          handleClose={() => {
            setSidebarOpen(false);
          }}
          title="Tools Collection"
          sidebarLinks={toolsList}
        />
      </div>
      <div className={`${getResponsiveClasses()} mt-4`}>
        <div className="flex justify-between  gap-7 relative">
          <div className="basis-[280px] hidden md:block lg:shrink-0 grow-0">
            <Sidebar title="Tools Collection" sidebarLinks={toolsList} />
          </div>
          <div className="grow">{children}</div>
        </div>
      </div>
      <SubscribeSection className="mt-10" />
      <Footer />
    </div>
  );
}

const toolsList = [
  {
    name: "AI Tools",
    icon: FaMicrochip,
    sublinks: [
      {
        name: "AI Writer",
        src: "/tools/ai/ai_writer",
      },
      {
        name: "AI Rewriter",
        src: "/tools/ai/ai_rewriter",
      },
      {
        name: "AI Outline Generator",
        src: "/tools/ai/outline_generator",
      },
      {
        name: "AI Translator",
        src: "/tools/ai/translate",
      },
    ],
  },
  {
    name: "Email Tools",
    icon: MdOutlineEmail,
    sublinks: [
      {
        name: "Email Text Extraction",
        src: "/tools/email_marketing/email_extractor",
      },
      {
        name: "SMTP Tester",
        src: "/tools/email_marketing/smtp_tester",
      },
      {
        name: "Free Email Checker",
        src: "/tools/email_marketing/email_checker",
      },
      {
        name: "Bulk Email Verifier",
        src: "/tools/email_marketing/bulk_email_checker",
      },
    ],
  },
  {
    name: "Web Tools",
    icon: BsGlobe2,
    sublinks: [
      {
        name: "Favicon Generator",
        src: "/tools/web/favicon_generator",
      },
      {
        name: "TOC Generator",
        src: "/tools/web/toc_generator",
      },
      {
        name: "Secure Password Generator",
        src: "/tools/web/secure_password_generator",
      },
      {
        name: "Privacy Policy Generator",
        src: "/tools/web/privacy_policy_generator",
      },
    ],
  },
  {
    name: "SEO Tools",
    icon: LuBarChart2,
    sublinks: [
      {
        name: "Keywords Research",
        src: "/tools/seo/keyword_research",
      },
      {
        name: "Questions People ask",
        src: "/tools/seo/people_also_ask",
      },
      {
        name: "Backlinks Checker",
        src: "/tools/seo/backlinks_checker",
      },
      {
        name: "Competitors Keyword Research",
        src: "/tools/seo/competitors_keyword_research",
      },
      {
        name: "Domain Authority Checker",
        src: "/tools/seo/domain_authority_checker",
      },
    ],
  },
];
