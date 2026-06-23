import { useCallback, useState } from "react";
import { authService } from "../services/auth.service";
import { forgotPasswordSchema, zodErrorsToRecord } from "@lefrigo/shared";
import { useFormErrors } from "@/hooks/useFormErrors";

/* ── Types ────────────────────────────────────────────────── */

/** Cycle de vie :
 *  idle → loading → success
 *                 → idle (erreur de validation Zod ou erreur serveur) */
type ForgotPasswordState = "idle" | "loading" | "success";

/* ── Hook ─────────────────────────────────────────────────── */

/**
 * Gère l'état et la logique du formulaire de demande de réinitialisation du mot de passe.
 *
 * - Valide l'email via `forgotPasswordSchema` (Zod)
 * - Appelle `authService.forgotPassword` et passe en `success` si l'envoi aboutit
 * - Expose `setEmail` avec effacement automatique de l'erreur Zod à chaque frappe
 */
export function useForgotPassword() {
  const [state, setState] = useState<ForgotPasswordState>("idle");
  const [email, setEmail] = useState("");
  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();

  /* ── Handler de soumission ──────────────────────────────── */

  /**
   * Soumet le formulaire après validation Zod.
   * Passe en `success` si l'email est envoyé, en `idle` sinon.
   */
  const handleForgotPassword = useCallback(
    async (e: React.SubmitEvent) => {
      e.preventDefault();
      setState("loading");
      setErrors({});

      const result = forgotPasswordSchema.safeParse({ email });
      if (!result.success) {
        setErrors(zodErrorsToRecord(result.error));
        setState("idle");
        return;
      }

      try {
        await authService.forgotPassword(result.data);
        setState("success");
      } catch (err) {
        setErrors({
          form: [err instanceof Error ? err.message : "Une erreur est survenue"],
        });
        setState("idle");
      }
    },
    [email, setErrors],
  );

  /* ── Retour ─────────────────────────────────────────────── */

  return {
    email,
    /** Handler onChange — efface l'erreur Zod du champ email à chaque frappe */
    setEmail: (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      clearFieldError("email");
    },
    loading: state === "loading",
    success: state === "success",
    errors,
    errorMessages,
    handleForgotPassword,
  };
}