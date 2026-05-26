"use client";

import { useAuth } from "@/contexts/auth.context";
import { useDevice } from "@/contexts/device.context";

export default function DashboardPage() {
  const { user } = useAuth();
  const { device } = useDevice();

  if(!user){
    return <p>Utilisateur non connecté</p>
  }

  return (
    <main>
      <h1>Bonjour {user.userName} 👋</h1>

      <p>Email : {user.email}</p>

      <p>Rôle : {user.role}</p>

      <p>Status : {user.status}</p>

      <p>

        Email vérifié : {user.emailVerified ? "Oui" : "Non"}

      </p>
      <h2>je tourne sur {device}</h2>
    </main>
  );
}
