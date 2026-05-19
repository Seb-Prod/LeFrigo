"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/");
    }
  }, [token, loading]);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}