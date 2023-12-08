import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./shared/hooks/scrollOnTop.tsx";
import { AuthProvider } from "./shared/contexts/auth.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />

        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
