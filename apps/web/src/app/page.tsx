"use client";

import Link from "next/link";
import { Button, Modal } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InstallPrompt } from "@/features/pwa";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [open, setOpen] = useState(false);


  /* Redirige vers le dashboard si déjà connecté */
  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);




 

  if (loading) return null;

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
          <Link href="/auth">
            <Button>Se connecter</Button>
          </Link>
          <Link href="/register">
            <Button>Créer un compte</Button>
          </Link>
        </div>
      </div>
      {/* ── Modal de test ── */}
      <button onClick={() => setOpen(true)}>Ouvrir la modal</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Connexion"
        animation="slide-down"
      >
        <p>Hello 👋</p>
      </Modal>

      <InstallPrompt/>
      {/* ── Modal d'invitation à installer la PWA ── */}

      {/* <Modal
        open={showPrompt}
        onClose={dismiss}
        title="Installer LeFrigo"
        animation="slide-down"
        dismissable={false}
      >
        
        {os === "ios" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <p>Pour installer l&apos;app sur votre iPhone :</p>
            <ol
              style={{
                paddingLeft: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <li>
                Appuyez sur <MdIosShare style={{ verticalAlign: "middle" }} />{" "}
                <strong>Partager</strong> en bas de Safari
              </li>
              <li>
                Faites défiler et appuyez sur{" "}
                <strong>« Sur l&apos;écran d&apos;accueil »</strong>
              </li>
              <li>
                Appuyez sur <strong>Ajouter</strong>
              </li>
            </ol>
          </div>
        )}

        
        {os === "android" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <p>Pour installer l&apos;app sur votre Android :</p>
            <ol
              style={{
                paddingLeft: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <li>
                Appuyez sur <strong>⋮</strong> (menu du navigateur)
              </li>
              <li>
                Appuyez sur <strong>« Ajouter à l&apos;écran d&apos;accueil »</strong>
              </li>
              <li>
                Confirmez en appuyant sur <strong>Ajouter</strong>
              </li>
            </ol>
          </div>
        )}

        <Button onClick={dismiss} style={{ marginTop: "1rem", width: "100%" }}>
          Compris
        </Button>
      </Modal> */}
    </main>
  );
}
