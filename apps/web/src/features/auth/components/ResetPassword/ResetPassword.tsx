"use client";

import { Alert, Button, Heading, InputPassword, Text } from "@/components/ui";
import styles from "./ResetPassword.module.css";
import { TbLockCog } from "react-icons/tb";
import { useAuthForm } from "../../hooks/useAuthForm";

type Props = { token: string };

export function ResetPassword({ token }: Props) {
  const form = useAuthForm();

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={(e) => form.handleResetPassword(e, token)}>
        {/* ── Icône ── */}
        <TbLockCog className={styles.icon} />

        <Heading align="center">Nouveau mot de passe</Heading>

        <Text align="center" size="lg">
          Choisissez un nouveau mot de passe pour votre compte. Il doit être
          différent de votre ancien mot de passe.
        </Text>

        <InputPassword
          placeholder="Nouveau mot de passe"
          required
          error={!!form.errors.password}
          value={form.fields.password}
          onChange={form.setField("password")}
        />

        <InputPassword
          placeholder="Confirmez le nouveau mot de passe"
          required
          error={!!form.errors.confirmPassword}
          value={form.fields.confirmPassword}
          onChange={form.setField("confirmPassword")}
        />

        <Button type="submit" disabled={form.loading}>
          {form.loading ? "Réinitialisation en cours..." : "Confirmer le nouveau mot de passe"}
        </Button>

        {/* ── Erreurs globales ── */}
        {form.errorMessages.length > 0 && (
          <Alert variant="error">
            <ul>
              {form.errorMessages.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}
      </form>
    </div>
  );
}