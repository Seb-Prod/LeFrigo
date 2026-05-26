"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";

export default function AuthenticatedGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !accessToken) {
      router.replace("/");
    }
  }, [accessToken, loading, router]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
}
