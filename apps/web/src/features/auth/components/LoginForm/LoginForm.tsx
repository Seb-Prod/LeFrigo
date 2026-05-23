"use client"

import { Button, Checkbox } from "@/components/ui";
import styles from "./LoginForm.module.css";
import { AuthTab } from "../AuthTab/AuthTab";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { InputEmail, InputPassword } from "@/components/ui/Input";
import Link from "next/link";

type Props = {
  onToggle: () => void;
  active: boolean;
};

export function LoginForm({ onToggle, active }: Props) {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const data = await api.login(email, password);

      login(data.token);

      router.push("/dashboard");
    } catch {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthTab
        onToggle={onToggle}
        activeLabel="Connectez-vous à votre compte"
        active={active}
        inactiveLabel={"Dèjà un compte ? Connectez vous"}
      />

      <form onSubmit={handleLogin} className={styles.loginFields}>
        <InputEmail
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputPassword
          placeholder="Mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href="/forgot-password" className={styles.forgot}>
          Mot de passe oublié ?
        </Link>
        <Button variant={"secondary"} type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
        <Checkbox
          id="signupcheck"
          label="Enregistrer mes identifiants"
          className={styles.checkbox}
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
