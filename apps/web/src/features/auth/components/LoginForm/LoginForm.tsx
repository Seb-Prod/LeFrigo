import { Button, Input } from "@/components/ui";
import styles from "./LoginForm.module.css";
import { Toggle } from "../Toggle/Toggle";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";

type Props = {
  active: boolean;
  onToggle: () => void;
};

export function LoginForm({ onToggle, active }: Props) {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const data = await api.login(email, password);
    login(data.token);
    router.push("/dashboard");
  } catch {
    alert("Login failed");
  }
};

  return (
    <div className={`${styles.formLogin} ${active ? styles.active : ""}`}>
      <Toggle
        onToggle={onToggle}
        label="Connectez-vous à votre compte"
        variant="login"
        active={active}
      />

      <form onSubmit={handleLogin} className={styles.loginFields}>
        <Input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a className={styles.forgot}>Mot de paasse oublié ?</a>
        <Button variant={"secondary"} type="submit" className={styles.btnLogin}>
          Se connecter
        </Button>
      </form>
    </div>
  );
}
