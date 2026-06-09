import { useCallback, useState } from "react";
import { authService } from "../services/auth.service";

/* ── Types ────────────────────────────────────────────────── */

/** Cycle de vie :
 *  idle → loading → success
 *                 → error (email introuvable ou erreur serveur) */
type ResendState = "idle" | "loading" | "success" | "error";

/* ── Hook ─────────────────────────────────────────────────── */

/**
 * Gère l'état et la logique du formulaire de renvoi d'email de vérification.
 *
 * - Appelle `authService.resendVerification` avec l'email saisi
 * - Répond toujours `success` même si l'email est inconnu (sécurité anti-énumération)
 * - Expose `setEmail` directement — pas de validation Zod, le backend gère
 */
export function useResendVerification() {
  const [state, setState] = useState<ResendState>("idle");
  const [email, setEmail] = useState("");

  /** Message d'erreur affiché en cas d'échec réseau ou serveur */
  const [errorMessage, setErrorMessage] = useState("");

  /* ── Handler de soumission ──────────────────────────────── */

  /** Soumet l'email pour renvoyer un lien de vérification. */
  const handleResend = useCallback(
    async (e: React.SubmitEvent) => {
      e.preventDefault();
      setState("loading");
      setErrorMessage("");

      try {
        await authService.resendVerification(email);
        setState("success");
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "Une erreur est survenue",
        );
        setState("error");
      }
    },
    [email],
  );

  /* ── Retour ─────────────────────────────────────────────── */

  return {
    email,
    setEmail,
    loading: state === "loading",
    success: state === "success",
    error: state === "error",
    errorMessage,
    handleResend,
  };
}