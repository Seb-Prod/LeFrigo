"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@shared/types/user.types"

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api.getUsers(token).then(setUsers);
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  );
}