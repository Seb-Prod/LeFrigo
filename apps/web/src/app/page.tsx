"use client";

import Link from "next/link";
import { Button, Modal } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InstallPrompt } from "@/features/pwa";
import { AuthForm } from "@/features/auth";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [authOpen, setAuthOpen] = useState(false);

  /* Redirige vers le dashboard si déjà connecté */
  // useEffect(() => {
  //   if (user) router.replace("/dashboard");
  // }, [user, router]);



  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      {/* ── Contenu hero ── */}
      <div style={{ maxWidth: 600, textAlign: "center" }}>
        <h1>LeFrigo</h1>
        <p>
          Planifiez vos repas, organisez vos menus et préparez vos futures
          listes de courses.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Button onClick={() => setAuthOpen(true)}>Se connecter</Button>
        </div>
      </div>

      <AuthForm open={authOpen} onClose={() => setAuthOpen(false)} />
      <InstallPrompt />
    </main>
  );
}
