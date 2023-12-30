import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./shared/hooks/scrollOnTop.tsx";
import { AuthProvider } from "./shared/contexts/auth.tsx";
import { ModalProvider } from "./shared/contexts/modals.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <AuthProvider>
          <ScrollToTop />

          <App />
        </AuthProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
