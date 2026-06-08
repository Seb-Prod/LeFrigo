"use client";

import { Alert, Button, FormCard, InputPassword } from "@/components/ui";
import { TbLockCheck, TbLockCog, TbLockQuestion } from "react-icons/tb";
import { useAuthForm } from "../../hooks/useAuthForm";
import { AuthForm } from "../AuthForm/AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── Types ────────────────────────────────────────────────── */

type Props = { token: string };

/**
 * Page de réinitialisation du mot de passe via token reçu par email.
 *
 * États visuels :
 * - `idle`    → formulaire avec deux champs mot de passe
 * - `loading` → bouton désactivé avec label "Réinitialisation en cours..."
 * - `success` → confirmation avec bouton d'ouverture de la modal de connexion
 * - `expired` → lien expiré avec redirection vers `/forgot-password`
 *
 * @param token - Token de réinitialisation extrait du query param de l'URL
 */
export function ResetPassword({ token }: Props) {
  const router = useRouter();
  const form = useAuthForm();

  /** Contrôle l'ouverture de la modal de connexion après succès */
  const [authOpen, setAuthOpen] = useState(false);

  {/* ── État succès ── */}
  if (form.success) {
    return (
      <FormCard icon={<TbLockCheck />} title="Mot de passe modifié !">
        <Alert variant="success">
          Votre mot de passe a bien été réinitialisé. Vous pouvez maintenant
          vous connecter.
        </Alert>
        <Button onClick={() => setAuthOpen(true)}>Se connecter</Button>
        <AuthForm open={authOpen} onClose={() => setAuthOpen(false)} />
      </FormCard>
    );
  }

  {/* ── État expiré ── */}
  if (form.expired) {
    return (
      <FormCard icon={<TbLockQuestion />} title="Lien expiré">
        <Alert variant="error">
          Ce lien de réinitialisation a expiré. Demandez-en un nouveau.
        </Alert>
        <Button onClick={() => router.push("/forgot-password")}>
          Demander un nouveau lien
        </Button>
      </FormCard>
    );
  }

  {/* ── Formulaire ── */}
  return (
    <FormCard
      icon={<TbLockCog />}
      title="Nouveau mot de passe"
      description="Choisissez un nouveau mot de passe pour votre compte. Il doit être différent de votre ancien mot de passe."
      onSubmit={(e) => form.handleResetPassword(e, token)}
      buttonLabel="Confirmer le nouveau mot de passe"
      buttonLoadingLabel="Réinitialisation en cours..."
      errorMessages={form.errorMessages}
      disabled={form.loading}
    >
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
    </FormCard>
  );
}