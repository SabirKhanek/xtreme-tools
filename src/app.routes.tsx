import { RouteObject } from "react-router-dom";
import { HomePage } from "./pages/home";
import { Auth } from "./pages/auth";
import { LoginPage } from "./pages/auth/login";
import { SignUp } from "./pages/auth/signup";
import { ForgetPassword } from "./pages/auth/forget";

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
];
