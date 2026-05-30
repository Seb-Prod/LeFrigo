"use client";

import { useAuth } from "@/contexts/auth.context";
import { useDevice } from "@/contexts/device.context";
import {
  CurrentSessionCard,
  OtherSessionsList,
  UserProfileCard,
} from "@/features/account/components";
import { authService } from "@/features/auth/services/auth.service";
import { authStorage } from "@/lib/auth";
import { UserSession } from "@lefrigo/shared";
import { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";

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

  const currentIdentifier = authStorage.getSessionIdentifier();
  const currentSession = sessions.find(
    (s) => s.sessionIdentifier === currentIdentifier,
  );
  const otherSessions = sessions.filter(
    (s) => s.sessionIdentifier !== currentIdentifier,
  );

  const handleRevoke = (id: string) => {
    authService.revokeSession(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <main className={styles.main}>
      <UserProfileCard user={user} device={device} />

      <CurrentSessionCard session={currentSession} />
      <OtherSessionsList sessions={otherSessions} onRevoke={handleRevoke} />
    </main>
  );
}
