import { DashboardLayout } from "@/components/layout";
import { AuthProvider } from "@/contexts/auth.context";
import { DeviceProvider } from "@/contexts/device.context";
import { ThemeProvider } from "@/contexts/theme.context";
import { AppBootstrap } from "@/features/app-bootstrap";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeFrigo",
  description: "Modern SaaS Starter",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <DeviceProvider>
            <AppBootstrap>
              <ThemeProvider>
                <DashboardLayout>{children}</DashboardLayout>
              </ThemeProvider>
            </AppBootstrap>
          </DeviceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
