import { useCallback, useState } from "react";
import { useFormErrors } from "@/hooks";
import { changePasswordSchema, zodErrorsToRecord } from "@lefrigo/shared";
import { authService } from "@/features/auth";

/* ── Types ── */

/** idle → loading → success | idle (erreur) */
type Status = "idle" | "loading" | "success";

type Fields = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

/* ── Constantes ── */

const INITIAL_FIELDS: Fields = {
  password: "Menace32",
  newPassword: "Menace32",
  confirmNewPassword: "Menace32",
};

/* ── Hook ── */

/**
 * Gère l'état et la logique du formulaire de changement de mot de passe.
 *
 * - Valide les champs via `changePasswordSchema` (Zod)
 * - Appelle `authService.changePassword` et passe en `success` si OK
 * - Expose `setField` avec effacement automatique de l'erreur à chaque frappe
 *
 * Erreurs serveur possibles :
 * - `INVALID_PASSWORD` : mot de passe actuel incorrect
 * - `SAME_PASSWORD`    : nouveau mot de passe identique à l'ancien
 */
export function useChangePassword() {
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState<Fields>(INITIAL_FIELDS);
  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();

  /* ── Helpers ── */

  /** Met à jour un champ et efface son erreur Zod. */
  const setField =
    <K extends keyof Fields>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      clearFieldError(key);
    };

  /* ── Submit ── */

  const handleChangePassword = useCallback(
    async (e: React.SubmitEvent) => {
      e.preventDefault();
      setStatus("loading");
      setErrors({});

      /** Validation Zod côté client */
      const result = changePasswordSchema.safeParse(fields);

      if (!result.success) {
        setErrors(zodErrorsToRecord(result.error));
        setStatus("idle");
        return;
      }

      setStatus("loading");

      try {
        await authService.changePassword(result.data);
        setStatus("success");
      } catch (err) {
        const message = err instanceof Error ? err.message : "";

        if (message === "INVALID_PASSWORD") {
          setErrors({ form: [message || "Mot de passe actuel incorrect."] });
          setStatus("idle");
        } else if (message === "SAME_PASSWORD") {
          setErrors({
            form: [
              message ||
                "Le nouveau mot de passe doit être différent de l'ancien.",
            ],
          });
          setStatus("idle");
        } else {
          setErrors({ form: [message || "Une erreur est survenue"] });
          setStatus("idle");
        }
      }
    },
    [fields, setErrors],
  );

  return {
    fields,
    setField,
    loading: status === "loading",
    success: status === "success",
    errors,
    errorMessages,
    handleChangePassword,
  };
}
