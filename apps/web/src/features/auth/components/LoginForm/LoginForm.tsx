"use client";

import { Alert, Button, Checkbox } from "@/components/ui";
import styles from "./LoginForm.module.css";
import { AuthTab } from "../AuthTab/AuthTab";
import { useMemo, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { InputEmail, InputPassword } from "@/components/ui/Input";
import Link from "next/link";
import { authDevDefaults } from "@/lib/dev/auth.dev";

type Props = {
  /** Bascule entre le formulaire login et signup */
  onToggle: () => void;
  /** Indique si ce formulaire est actif (affiché en avant-plan) */
  active: boolean;
};

export function LoginForm({ onToggle, active }: Props) {
  const router = useRouter();
  const { login } = useAuth();

  const devDefaults = useMemo(() => authDevDefaults, []);

  // -- État du formulaire
  const [email, setEmail] = useState(devDefaults.email);
  const [password, setPassword] = useState(devDefaults.password);
  const [remember, setRemember] = useState(false);

  // -- État UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -- Soumission
  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await api.login(email, password);
      login(data.token);
      // TODO: implémenter la persistance de session avec `remember`
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthTab
        onToggle={onToggle}
        active={active}
        activeLabel="Connectez-vous à votre compte"
        inactiveLabel={"Déjà un compte ? Connectez-vous"}
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
        <Checkbox
          id="signupcheck"
          label="Se souvenir de moi"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className={styles.checkbox}
        />
        <Link href="/forgot-password" className={styles.forgot}>
          Mot de passe oublié ?
        </Link>
        <Button variant="secondary" type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
        {error && <Alert variant="error">{error}</Alert>}
      </form>
    </div>
  );
}
