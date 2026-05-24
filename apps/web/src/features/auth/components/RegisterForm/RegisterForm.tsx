import { Alert, Button, Checkbox } from "@/components/ui";
import styles from "./RegisterForm.module.css";
import { AuthTab } from "@/features/auth/components/AuthTab/AuthTab";
import { useMemo, useState } from "react";
import { authDevDefaults } from "@/lib/dev/auth.dev";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";
import {
  InputEmail,
  InputPassword,
  InputUserName,
} from "@/components/ui/Input";
import Link from "next/link";
import { registerSchema, zodErrorsToRecord } from "@lefrigo/shared";

type Props = {
  /** Bascule entre le formulaire login et register */
  onToggle: () => void;
  /** Indique si ce formulaire est actif (affiché en avant-plan) */
  active: boolean;
};

export function RegisterForm({ onToggle, active }: Props) {
  const router = useRouter();
  // const { register } = useAuth();

  const devDefaults = useMemo(() => authDevDefaults, []);

  // -- État du formulaire
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState(devDefaults.email);
  const [password, setPassword] = useState(devDefaults.password);
  const [confirmPassword, setConfirmPassword] = useState(devDefaults.password);
  const [accept, setAccept] = useState(false);

  // -- État UI
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // -- Soumission
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validation Zod
    const result = registerSchema.safeParse({
      userName,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error));
      setLoading(false);
      return;
    }

    try {
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthTab
        onToggle={onToggle}
        active={active}
        activeLabel="Créez un compte gratuitement"
        inactiveLabel={"Pas encore de compte ? Créez-en un."}
      />

      <form onSubmit={handleSubmit} className={styles.fields}>
        <InputUserName
          placeholder="Pseudo"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <InputEmail
          placeholder="Adresse Email"
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
        <InputPassword
          placeholder="Confirmez le mot de passe"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Checkbox
          id="signupcheck"
          label="Accepter les conditions d'utilisation"
          checked={accept}
          onChange={(e) => setAccept(e.target.checked)}
        />
        <Link href="/terms" className={styles.terms}>
          Voir les conditions d&apos;utilisation
        </Link>
        <Button variant="secondary" type="submit" disabled={loading}>
          {loading ? "Création du compte..." : "Créer mon compte"}
        </Button>
        {Object.keys(errors).length > 0 && (
          <Alert variant="error">
            <ul>
              {Object.values(errors)
                .flat()
                .map((error) => (
                  <li key={error}>{error}</li>
                ))}
            </ul>
          </Alert>
        )}
      </form>
    </div>
  );
}
