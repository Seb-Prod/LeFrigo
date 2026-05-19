"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@shared/types/user.types";

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);

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
    <>
      <h1>Dashboard</h1>

      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}