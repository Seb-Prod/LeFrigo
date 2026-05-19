"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@shared/types/user.types"
import { useDevice } from "@/contexts/device.context";

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const device = useDevice();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api.getUsers(token).then(setUsers);
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Device: {device.device}</h1>

      <p>iOS: {device.isIOS ? "yes" : "no"}</p>

      <p>Android: {device.isAndroid ? "yes" : "no"}</p>

      <p>PWA: {device.isPWA ? "yes" : "no"}</p>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  );
}