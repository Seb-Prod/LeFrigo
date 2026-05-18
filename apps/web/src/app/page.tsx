"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function HomePage() {
  const router = useRouter();

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");

  const handleLogin = async () => {
    try {
      const data = await api.login(email, password);

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>LeFrigo</h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </main>
  );
}