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

export const routesConfig: RouteObject[] = [
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
        ],
      },
      {
        path: "ai",
        element: <Outlet />,
        children: [
          { path: "ai_writer", element: <AiWriter /> },
          { path: "ai_rewriter", element: <AIRewriter /> },
          { path: "outline_generator", element: <OutlineGenerator /> },
          { path: "translate", element: <AITranslator /> },
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
