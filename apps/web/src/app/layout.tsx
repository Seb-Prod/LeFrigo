import { AuthProvider } from "@/contexts/auth.context";
import { DeviceProvider } from "@/contexts/device.context";
import "@/styles/variables.css"; 
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
          <DeviceProvider>{children}</DeviceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
