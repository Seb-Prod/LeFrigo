import { useEffect, useState } from "react";
import { authService } from "../services/auth.service";

/* ── Types ────────────────────────────────────────────────── */

type VerifyState =
  | "loading"
  | "success"
  | "already-verified"
  | "expired"
  | "invalid";

/* ── Hook ─────────────────────────────────────────────────── */

/**
 * Vérifie automatiquement l'adresse e-mail via le token reçu par email.
 *
 * - Se déclenche au montage via `useEffect`
 * - Appelle `authService.verifyEmail` et mappe la réponse sur un état typé
 * - Distingue 5 états : `loading`, `success`, `already-verified`, `expired`, `invalid`
 * - Les codes d'erreur `EMAIL_ALREADY_VERIFIED` et `TOKEN_EXPIRED` sont émis par le backend
 *
 * @param token - Token extrait du query param `?token=` de l'URL
 */
export function useVerifyEmail(token: string) {
  /** Démarre à `"invalid"` si token absent, `"loading"` sinon */
  const [state, setState] = useState<VerifyState>(
    token ? "loading" : "invalid"
  );

  useEffect(() => {
    if (!token) return;

    authService.verifyEmail(token).then(() => {
      setState("success");
    }).catch((err) => {
      const message = err instanceof Error ? err.message : "";

      if (message === "EMAIL_ALREADY_VERIFIED") setState("already-verified");
      else if (message === "TOKEN_EXPIRED") setState("expired");
      else setState("invalid");
    });
  }, [token]);

  return {
    loading: state === "loading",
    success: state === "success",
    alreadyVerified: state === "already-verified",
    expired: state === "expired",
    invalid: state === "invalid",
  };
}