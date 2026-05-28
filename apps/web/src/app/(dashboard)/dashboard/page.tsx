"use client";

import { useAuth } from "@/contexts/auth.context";
import { useDevice } from "@/contexts/device.context";
import { SessionCard, UserProfileCard } from "@/features/account/components";
import { authService } from "@/features/auth/services/auth.service";
import { authStorage } from "@/lib/auth";
import { UserSession } from "@lefrigo/shared";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { device } = useDevice();
  const [sessions, setSessions] = useState<UserSession[]>([]);

  useEffect(() => {
    if (!user) return;
    authService.getSessions().then(setSessions);
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
          onRevoke={async () => {
            await authService.revokeSession(session.id);

            setSessions((prev) => prev.filter((s) => s.id !== session.id));
          }}
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
