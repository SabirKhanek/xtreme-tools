import { Outlet, RouteObject } from "react-router-dom";
import { HomePage } from "./pages/home";
import { Auth } from "./pages/auth";
import { LoginPage } from "./pages/auth/login";
import { SignUp } from "./pages/auth/signup";
import { ForgetPassword } from "./pages/auth/forget";
import { Tools } from "./pages/tools";
import { EmailExtractor } from "./pages/tools/email_marketing/email_extractor";
import { SecurePasswordGenerator } from "./pages/tools/web/secure_password_generator";

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
        children: [{ path: "email_extractor", element: <EmailExtractor /> }],
      },
      {
        path: "web",
        element: <Outlet />,
        children: [
          {
            path: "secure_password_generator",
            element: <SecurePasswordGenerator />,
          },
        ],
      },
    ],
  },
];
