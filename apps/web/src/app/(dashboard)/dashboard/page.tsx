"use client";

import { useAuth } from "@/contexts/auth.context";
import { useDevice } from "@/contexts/device.context";
import { SessionCard, UserProfileCard } from "@/features/account/components";
import { authApi, authStorage } from "@/lib/auth";
import { UserSession } from "@lefrigo/shared";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { device } = useDevice();
  const [sessions, setSessions] = useState<UserSession[]>([]);

  useEffect(() => {
    if (!user) return;
    authApi.getSessions().then(setSessions);
  }, [user]);

  if (!user) {
    return <p>Utilisateur non connecté</p>;
  }

  return (
    <main>
      <UserProfileCard user={user} device={device} />
      <h2>Sessions actives</h2>
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          isCurrent={
            session.sessionIdentifier === authStorage.getSessionIdentifier()
          }
        />
      ))}
      <p>test</p>
      <p>{authStorage.getSessionIdentifier()}</p>
    </main>
  );
}
