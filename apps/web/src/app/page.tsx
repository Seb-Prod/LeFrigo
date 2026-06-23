"use client";

import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DiscoverPage } from "@/features/discover";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  /* Redirige vers le dashboard si déjà connecté */
  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);


  return (
    <DiscoverPage/>
  );
}
