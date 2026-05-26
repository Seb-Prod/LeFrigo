"use client";

import { useAuth } from "@/contexts/auth.context";
import { useDevice } from "@/contexts/device.context";
import { request } from "@/lib/api/request";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { device } = useDevice();
  const [profile, setProfile] = useState(null);

  if (!user) {
    return <p>Utilisateur non connecté</p>;
  }

  useEffect(() => {

  request("/auth/me")

    .then(setProfile)

    .catch(console.error);

}, []);

  return (
    <main>
      <h1>Bonjour {user.userName} 👋</h1>

      <p>Email : {user.email}</p>

      <p>Rôle : {user.role}</p>

      <p>Status : {user.status}</p>

      <p>Email vérifié : {user.emailVerified ? "Oui" : "Non"}</p>

      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <h2>je tourne sur {device}</h2>
    </main>
  );
}
