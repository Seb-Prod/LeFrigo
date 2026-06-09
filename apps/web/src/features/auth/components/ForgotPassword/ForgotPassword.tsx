"use client";

import { Alert, FormCard, InputEmail } from "@/components/ui";
import { TbLockQuestion, TbMailCheck } from "react-icons/tb";
import { useDevice } from "@/contexts/device.context";
import { useForgotPassword } from "../../hooks/useForgotPassword";

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
  const {
    email,
    setEmail,
    loading,
    success,
    errors,
    errorMessages,
    handleForgotPassword,
  } = useForgotPassword();

  {
    /* ── État succès ── */
  }
  if (success) {
    return (
      <FormCard icon={<TbMailCheck />} title="Email envoyé !">
        <Alert variant="success">
          Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser
          votre mot de passe.
        </Alert>
      </FormCard>
    );
  }

  {
    /* ── Formulaire ── */
  }
  return (
    <FormCard
      isMobile={isMobile}
      icon={<TbLockQuestion />}
      title="Mot de passe oublié"
      description="Après avoir renseigné l'email de votre compte, vous recevrez un message permettant de réinitialiser votre mot de passe."
      onSubmit={handleForgotPassword}
      buttonLabel="Réinitialiser mon mot de passe"
      buttonLoadingLabel="Envoi en cours..."
      errorMessages={errorMessages}
      disabled={loading}
    >
      <InputEmail
        placeholder="Votre email"
        required
        error={!!errors.email}
        value={email}
        onChange={setEmail}
      />
    </FormCard>
  );
}
