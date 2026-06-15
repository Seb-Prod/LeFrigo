"use client";

import { Alert, Button, FormCard, InputEmail } from "@/components/ui";
import { TbMailCheck, TbMailX } from "react-icons/tb";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
import { AuthForm } from "../AuthForm/AuthForm";
import { useState } from "react";
import { useResendVerification } from "../../hooks/useResendVerification";

/* ── Types ────────────────────────────────────────────────── */

type Props = { token: string };

/**
 * Page de vérification d'adresse e-mail via token reçu par email.
 *
 * États visuels (pilotés par `useVerifyEmail`) :
 * - `loading`         → vérification API en cours
 * - `success`         → email confirmé, invite à se connecter
 * - `alreadyVerified` → compte déjà actif, invite à se connecter
 * - `expired`         → lien expiré, formulaire de renvoi via `useResendVerification`
 *   - `resendSuccess` → confirmation d'envoi du nouvel email
 * - `invalid`         → token introuvable, message d'erreur statique
 *
 * @param token - Token de vérification extrait du query param de l'URL
 */
export function VerifyEmail({ token }: Props) {
  const { loading, success, alreadyVerified, expired, invalid } =
    useVerifyEmail(token);

  const {
    email,
    setEmail,
    loading: resendLoading,
    error,
    errorMessage,
    success: resendSuccess,
    handleResend,
  } = useResendVerification();

  /** Contrôle l'ouverture de la modal de connexion après succès */
  const [authOpen, setAuthOpen] = useState(false);

  {
    /* ── Vérification en cours ── */
  }
  if (loading) {
    return (
      <FormCard icon={<TbMailCheck />} title="Vérification en cours…">
        <Alert color="info">
          Nous confirmons votre adresse e-mail, cela ne prendra qu&apos;un
          instant.
        </Alert>
      </FormCard>
    );
  }

  {
    /* ── Email confirmé ── */
  }
  if (success) {
    return (
      <FormCard icon={<TbMailCheck />} title="E-mail confirmé !">
        <Alert color="success">
          Votre adresse e-mail a bien été vérifiée. Vous pouvez maintenant
          accéder à votre compte.
        </Alert>
        <Button onClick={() => setAuthOpen(true)}>Se connecter</Button>
        <AuthForm open={authOpen} onClose={() => setAuthOpen(false)} />
      </FormCard>
    );
  }

  {
    /* ── Déjà vérifié ── */
  }
  if (alreadyVerified) {
    return (
      <FormCard icon={<TbMailCheck />} title="Adresse déjà vérifiée">
        <Alert color="success">
          Votre adresse e-mail a bien été vérifiée. Vous pouvez maintenant
          accéder à votre compte.
        </Alert>
        <Button onClick={() => setAuthOpen(true)}>Se connecter</Button>
        <AuthForm open={authOpen} onClose={() => setAuthOpen(false)} />
      </FormCard>
    );
  }

  {
    /* ── Lien expiré ── */
  }
  if (expired) {
    {
      /* ── Renvoi confirmé ── */
    }
    if (resendSuccess) {
      return (
        <FormCard icon={<TbMailCheck />} title="Email envoyé !">
          <Alert color="success">
            Vérifiez votre boîte mail pour confirmer votre adresse e-mail.
          </Alert>
        </FormCard>
      );
    }

    return (
      <FormCard
        icon={<TbMailX />}
        title="Lien expiré"
        onSubmit={handleResend}
        buttonLabel="Renvoyer l'email"
        buttonLoadingLabel="Envoi en cours..."
        disabled={resendLoading}
        errorMessages={error ? [errorMessage] : []}
      >
        <Alert color="error">
          Ce lien de vérification a expiré. Renseignez votre email pour en
          recevoir un nouveau.
        </Alert>
        <InputEmail
          placeholder="Votre email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormCard>
    );
  }

  {
    /* ── Lien invalide ── */
  }
  return (
    <FormCard icon={<TbMailX />} title="Lien invalide">
      <Alert color="error">
        Ce lien de vérification n&apos;est pas valide.
      </Alert>
    </FormCard>
  );
}
