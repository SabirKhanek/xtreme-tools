import { Outlet, RouteObject } from "react-router-dom";
import { HomePage } from "./pages/home";
import { Auth } from "./pages/auth";
import { LoginPage } from "./pages/auth/login";
import { SignUp } from "./pages/auth/signup";
import { ForgetPassword } from "./pages/auth/forget";
import { Tools } from "./pages/tools";
import { EmailExtractor } from "./pages/tools/email_marketing/email_extractor";
import { SecurePasswordGenerator } from "./pages/tools/web/secure_password_generator";
import { TOCGenerator } from "./pages/tools/web/toc_generator";
import { PrivacyPolicyGenerator } from "./pages/tools/web/privacy_policy_generator";
import { SMTPTester } from "./pages/tools/email_marketing/smtp_tester";
import { FaviconGenerator } from "./pages/tools/web/favicon_generator";
import { AiWriter } from "./pages/tools/ai/ai_writer";
import { AIRewriter } from "./pages/tools/ai/ai_rewriter";
import { OutlineGenerator } from "./pages/tools/ai/outline_generator";
import { AITranslator } from "./pages/tools/ai/ai_translator";
import { ToastRoute } from "./components/userVerified";
import { EmailChecker } from "./pages/tools/email_marketing/email_checker";
import { KeywordsResearch } from "./pages/tools/seo/keywords_research";
import { PeopleAlsoAsk } from "./pages/tools/seo/people_ask";
import { BacklinksChecker } from "./pages/tools/seo/backlinks_checker";
import { CompetitorsKeywordResearch } from "./pages/tools/seo/competitors_keywords_research";
import { DAPACheck } from "./pages/tools/seo/da_pa_check";

export const routesConfig: RouteObject[] = [
  {
    path: "/user_verified",
    element: <ToastRoute message="Verification was a succeess" />,
  },
  {
    path: "/verification_failed",
    element: <ToastRoute error message="Verification was not successful" />,
  },
  { path: "/", element: <HomePage /> },
  {
    element: <Auth />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUp /> },
      { path: "forget", element: <ForgetPassword /> },
    ],
  },
  {
    path: "tools",
    element: <Tools />,
    children: [
      {
        path: "email_marketing",
        element: <Outlet />,
        children: [
          { path: "email_extractor", element: <EmailExtractor /> },
          { path: "smtp_tester", element: <SMTPTester /> },
          {
            path: "email_checker",
            element: <EmailChecker singleMode toolId="email_checker" />,
          },
          {
            path: "bulk_email_checker",
            element: <EmailChecker requireLogin toolId="bulk_email_checker" />,
          },
        ],
      },
      {
        path: "seo",
        element: <Outlet />,
        children: [
          {
            path: "keyword_research",
            element: (
              <KeywordsResearch requireLogin toolId="keywords_research" />
            ),
          },
          {
            path: "people_also_ask",
            element: (
              <PeopleAlsoAsk requireLogin toolId="people_also_ask_tool" />
            ),
          },
          {
            path: "backlinks_checker",
            element: (
              <BacklinksChecker requireLogin toolId="backlinks_checker" />
            ),
          },
          {
            path: "competitors_keyword_research",
            element: (
              <CompetitorsKeywordResearch
                requireLogin
                toolId="competitors_keyword_checker"
              />
            ),
          },
          {
            path: "domain_authority_checker",
            element: (
              <DAPACheck requireLogin toolId="domain_authority_checker" />
            ),
          },
        ],
      },
      {
        path: "ai",
        element: <Outlet />,
        children: [
          {
            path: "ai_writer",
            element: <AiWriter requireLogin toolId="ai_writer" />,
          },
          {
            path: "ai_rewriter",
            element: <AIRewriter toolId="ai_rewriter" requireLogin />,
          },
          {
            path: "outline_generator",
            element: (
              <OutlineGenerator toolId="outline_generator" requireLogin />
            ),
          },
          {
            path: "translate",
            element: <AITranslator toolId="ai_translator" requireLogin />,
          },
        ],
      },
      {
        path: "web",
        element: <Outlet />,
        children: [
          {
            path: "favicon_generator",
            element: <FaviconGenerator />,
          },
          {
            path: "secure_password_generator",
            element: <SecurePasswordGenerator />,
          },
          {
            path: "toc_generator",
            element: <TOCGenerator />,
          },
          {
            path: "privacy_policy_generator",
            element: <PrivacyPolicyGenerator />,
          },
        ],
      },
    ],
  },
];
