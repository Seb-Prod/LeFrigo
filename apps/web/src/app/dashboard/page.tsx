"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      const data = await api.getUsers(token);

      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <pre>
        {JSON.stringify(users, null, 2)}
      </pre>
    </main>
  );
}