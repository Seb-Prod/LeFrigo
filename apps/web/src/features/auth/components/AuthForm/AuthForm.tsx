"use client";

import { useState } from "react";
import styles from "./AuthForm.module.css";
import { LoginForm } from "@/features/auth/components/LoginForm/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm/RegisterForm";

export function AuthForm() {
  const [isLogin, setisLogin] = useState(true);

  return (
    <section className={styles.wrapper}>
      <RegisterForm onToggle={() => setisLogin(false)} active={!isLogin} />
      <div className={`${styles.formLogin} ${isLogin ? styles.active : ""}`}>
        <LoginForm onToggle={() => setisLogin(true)} active={isLogin}/>
      </div>
    </section>
  );

}