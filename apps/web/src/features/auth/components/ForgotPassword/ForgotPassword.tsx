"use client";

import { Alert, FormCard, InputEmail } from "@/components/ui";
import { TbLockQuestion, TbMailCheck } from "react-icons/tb";
import { useDevice } from "@/contexts/device.context";
import { useAuthForm } from "../../hooks/useAuthForm";

/**
 * Page de demande de réinitialisation du mot de passe.
 *
 * États visuels :
 * - `idle`    → formulaire avec champ email et bouton de soumission
 * - `loading` → bouton désactivé avec label "Envoi en cours..."
 * - `success` → confirmation d'envoi, invite à consulter la boîte mail
 */
export function ForgotPassword() {
  const { isMobile } = useDevice();
  const form = useAuthForm();

  {/* ── État succès ── */}
  if (form.success) {
    return (
      <FormCard icon={<TbMailCheck />} title="Email envoyé !">
        <Alert variant="success">
          Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser
          votre mot de passe.
        </Alert>
      </FormCard>
    );
  }

  {/* ── Formulaire ── */}
  return (
    <FormCard
      isMobile={isMobile}
      icon={<TbLockQuestion />}
      title="Mot de passe oublié"
      description="Après avoir renseigné l'email de votre compte, vous recevrez un message permettant de réinitialiser votre mot de passe."
      onSubmit={form.handleForgotPassword}
      buttonLabel="Réinitialiser mon mot de passe"
      buttonLoadingLabel="Envoi en cours..."
      errorMessages={form.errorMessages}
      disabled={form.loading}
    >
      <InputEmail
        placeholder="Votre email"
        required
        error={!!form.errors.email}
        value={form.fields.email}
        onChange={form.setField("email")}
      />
    </FormCard>
  );
}