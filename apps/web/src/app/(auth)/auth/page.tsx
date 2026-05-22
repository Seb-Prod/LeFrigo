"use client";

import styles from "./auth.module.css";

import { AuthForm } from "@/features/auth";

export default function AuthPage() {
  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  );
}
