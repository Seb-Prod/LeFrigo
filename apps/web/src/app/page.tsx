"use client";

import Link from "next/link";

import { Button } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, [token, router]);

  if (loading) {
    return null;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          textAlign: "center",
        }}
      >
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
          <Link href="/login">
            <Button>Se connecter</Button>
          </Link>

          <Link href="/register">
            <Button>Créer un compte</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
