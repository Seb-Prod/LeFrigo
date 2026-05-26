import { DashboardLayout } from "@/components/layout";
import AuthenticatedGuard from "@/components/auth/AuthenticateGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthenticatedGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthenticatedGuard>
  );
}
