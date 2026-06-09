import { useCallback, useState } from "react";
import { authService } from "../services/auth.service";
import { resetPasswordShema, zodErrorsToRecord } from "@lefrigo/shared";
import { useFormErrors } from "@/hooks";

/* ── Types ────────────────────────────────────────────────── */

/** Cycle de vie du formulaire :
 *  idle → loading → success
 *                 → expired (token expiré côté backend)
 *                 → idle (erreur de validation ou erreur serveur) */
type ResetPasswordState = "idle" | "loading" | "success" | "expired";

/* ── État initial des champs ──────────────────────────────── */

const INITIAL_FIELDS = {
  password: "",
  confirmPassword: "",
};

/* ── Hook ─────────────────────────────────────────────────── */

/**
 * Gère l'état et la logique du formulaire de réinitialisation du mot de passe.
 *
 * - Valide les champs via `resetPasswordShema` (Zod)
 * - Appelle `authService.resetPassword` avec le token passé à `handleResetPassword`
 * - Distingue l'expiration du token (`expired`) des autres erreurs serveur
 * - Expose `setField` pour effacer les erreurs Zod à chaque frappe
 */
export function useResetPassword() {
  const [state, setState] = useState<ResetPasswordState>("idle");
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();

  /* ── Helpers ────────────────────────────────────────────── */

  /**
   * Retourne un handler onChange pour le champ donné.
   * Efface l'erreur Zod du champ à chaque frappe.
   */
  const setField =
    <K extends keyof typeof INITIAL_FIELDS>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      clearFieldError(key);
    };

  /* ── Handler de soumission ──────────────────────────────── */

  /**
   * Soumet le formulaire après validation Zod.
   * Passe en `expired` si le backend répond `TOKEN_EXPIRED`.
   *
   * @param e     - Événement de soumission du formulaire
   * @param token - Token de réinitialisation extrait du query param de l'URL
   */
  const handleResetPassword = useCallback(
    async (e: React.SubmitEvent, token: string) => {
      e.preventDefault();
      setState("loading");
      setErrors({});

      const result = resetPasswordShema.safeParse({
        token,
        password: fields.password,
        confirmPassword: fields.confirmPassword,
      });

      if (!result.success) {
        setErrors(zodErrorsToRecord(result.error));
        setState("idle");
        return;
      }

      try {
        await authService.resetPassword(result.data);
        setState("success");
      } catch (err) {
        const message = err instanceof Error ? err.message : "";

        if (message === "TOKEN_EXPIRED") {
          setState("expired");
        } else {
          setErrors({ form: [message || "Une erreur est survenue"] });
          setState("idle");
        }
      }
    },
    [fields, setErrors],
  );

  /* ── Retour ─────────────────────────────────────────────── */

  return {
    fields,
    setField,
    loading: state === "loading",
    success: state === "success",
    expired: state === "expired",
    errors,
    errorMessages,
    handleResetPassword,
  };
}