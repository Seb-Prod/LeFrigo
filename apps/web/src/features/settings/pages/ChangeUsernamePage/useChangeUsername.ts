/* ── Types ── */

import { authService } from "@/features/auth";
import { useFormErrors } from "@/hooks";
import { changeUsernameSchema, zodErrorsToRecord } from "@lefrigo/shared";
import { useCallback, useState } from "react";

/** idle → loading → success | idle (erreur) */
type Status = "idle" | "loading" | "success";

type Fields = {
  userName: string;
};

/* ── Constantes ── */

const INITIAL_FIELDS: Fields = {
  userName: "test",
};

export function useChangeUsername() {
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

  const handleChangeUsername = useCallback(
    async (e: React.SubmitEvent) => {
      e.preventDefault();
      setStatus("loading");
      setErrors({});

      /** Validation Zod côté client */
      const result = changeUsernameSchema.safeParse(fields);

      if (!result.success) {
        setErrors(zodErrorsToRecord(result.error));
        setStatus("idle");
        return;
      }

      setStatus("loading");

      try {
        await authService.changeUsername(result.data);
        setStatus("success");
      } catch (err) {
        const message = err instanceof Error ? err.message : "";
        setErrors({ form: [message || "Une erreur est survenue"] });
        setStatus("idle");
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
    handleChangeUsername,
  };
}
