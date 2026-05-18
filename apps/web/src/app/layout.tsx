import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeFrigo",
  description: "Modern SaaS Starter",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}