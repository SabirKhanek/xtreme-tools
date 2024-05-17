import { CookiesProvider } from "next-client-cookies/server";
import ToolsPageLayout from "./toolsClientLayout";

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CookiesProvider>
      <ToolsPageLayout>{children}</ToolsPageLayout>
    </CookiesProvider>
  );
}
