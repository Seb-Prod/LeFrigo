"use client";

import {
  Alert,
  Button,
  ButtonPrev,
  Heading,
  InputEmail,
  Text,
} from "@/components/ui";
import styles from "./ForgotPassword.module.css";
import { TbLockQuestion } from "react-icons/tb";
import { useDevice } from "@/contexts/device.context";
import { useBack } from "@/hooks";
import { useAuthForm } from "../../hooks/useAuthForm";

export function ForgotPassword() {
  const { isMobile } = useDevice();
  const goBack = useBack();

  const form = useAuthForm();

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={form.handleForgotPassword}>
        {/* ── Bouton retour (mobile uniquement) ── */}
        {isMobile && (
          <ButtonPrev
            onClick={() => {
              goBack();
            }}
          />
        )}

        {/* ── Icône ── */}
        <TbLockQuestion className={styles.icon} />

        <Heading align="center">Mot de passe oublié</Heading>

        <Text align="center" size="lg">
          Après avoir renseigné l&apos;email de votre compte, vous recevrez un
          message permettant de réinitialiser votre mot de passe.
        </Text>

        <InputEmail
          placeholder="Votre email"
          required
          error={!!form.errors.email}
          value={form.fields.email}
          onChange={form.setField("email")}
        />

        <Button type="submit" disabled={form.loading}>
          {form.loading
            ? "Envoie de l'email en cours..."
            : "Réinitialiser mon mot de passe"}
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
