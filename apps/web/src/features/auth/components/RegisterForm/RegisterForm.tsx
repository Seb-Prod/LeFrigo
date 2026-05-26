import { Alert, Button, Checkbox } from "@/components/ui";
import styles from "./RegisterForm.module.css";
import { AuthTab } from "@/features/auth/components/AuthTab/AuthTab";
import { useState } from "react";
import { authDevDefaults } from "@/lib/dev/auth.dev";
import { useRouter } from "next/navigation";
import {
  InputEmail,
  InputPassword,
  InputUserName,
} from "@/components/ui/Input";
import Link from "next/link";
import { registerSchema, zodErrorsToRecord } from "@lefrigo/shared";
import { useFormErrors } from "@/hooks";
import { authService } from "@/features/auth/services/auth.service";

type Props = {
  /** Bascule entre le formulaire login et register */
  onToggle: () => void;
  /** Indique si ce formulaire est actif (affiché en avant-plan) */
  active: boolean;
};

/**
 * Formulaire d'inscription.
 * Gère la validation Zod côté client et bascule vers le formulaire de connexion via `onToggle`.
 */
export function RegisterForm({ onToggle, active }: Props) {
  const router = useRouter();
  // const { register } = useAuth();

  const devDefaults = authDevDefaults;

  // -- État du formulaire
  const [form, setForm] = useState({
    userName: "",
    email: devDefaults.email,
    password: devDefaults.password,
    confirmPassword: devDefaults.password,
    accept: false,
  });

  // -- État UI
  const [loading, setLoading] = useState(false);
  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();

  /** Met à jour un champ du formulaire et efface son erreur associée. */
  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      setForm((prev) => ({ ...prev, [field]: value }));

      clearFieldError(field);
    };

  // -- Soumission
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validation Zod
    const result = registerSchema.safeParse(form);

    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error));
      setLoading(false);
      return;
    }

    try {
      const auth = await authService.register(result.data);

      // TODO si tu veux : login context ici

      // login(auth.token, auth.user);

      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue";

      setErrors({ form: [message] });
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
          error={!!errors.userName}
          value={form.userName}
          onChange={handleChange("userName")}
        />
        <InputEmail
          placeholder="Adresse Email"
          required
          error={!!errors.email}
          value={form.email}
          onChange={handleChange("email")}
        />
        <InputPassword
          placeholder="Mot de passe"
          required
          error={!!errors.password}
          value={form.password}
          onChange={handleChange("password")}
        />
        <InputPassword
          placeholder="Confirmez le mot de passe"
          error={!!errors.confirmPassword}
          required
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
        />
        <Checkbox
          id="signupcheck"
          label="Accepter les conditions d'utilisation"
          checked={form.accept}
          onChange={handleChange("accept")}
        />
        <Link href="/terms" className={styles.terms}>
          Voir les conditions d&apos;utilisation
        </Link>
        <Button variant="secondary" type="submit" disabled={loading}>
          {loading ? "Création du compte..." : "Créer mon compte"}
        </Button>
        {errorMessages.length > 0 && (
          <Alert variant="error">
            <ul>
              {errorMessages.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}
      </form>
    </div>
  );
}
