"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@shared/types/user.types";
import { useDevice } from "@/contexts/device.context";

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const {device} = useDevice();

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
      <h2>je tourne sur {device}</h2>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}