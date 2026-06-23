import { useCallback, useState } from "react";
import { useFormErrors } from "@/hooks/useFormErrors";
import { ZodSchema, zodErrorsToRecord } from "@lefrigo/shared";

type Status = "idle" | "loading" | "success";

type UseFormSubmitOptions<TFields, TData> = {
  /** Schéma Zod pour la validation côté client */
  schema: ZodSchema<TData>;
  /** Valeurs initiales des champs */
  initialFields: TFields;
  /** Appel API — reçoit les données validées par Zod */
  onSubmit: (data: TData) => Promise<unknown>;
  /** Map d'erreurs serveur code → message lisible */
  errorMap?: Record<string, string>;
};

export function useFormSubmit<TFields extends Record<string, string>, TData>({
  schema,
  initialFields,
  onSubmit,
  errorMap = {},
}: UseFormSubmitOptions<TFields, TData>) {
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState<TFields>(initialFields);
  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();

  /** Met à jour un champ et efface son erreur Zod. */
  const setField =
    <K extends keyof TFields>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      clearFieldError(key as string);
    };

  const handleSubmit = useCallback(
    async (e: React.SubmitEvent) => {
      e.preventDefault();
      setStatus("loading");
      setErrors({});

      const result = schema.safeParse(fields);

      if (!result.success) {
        setErrors(zodErrorsToRecord(result.error));
        setStatus("idle");
        return;
      }

      try {
        await onSubmit(result.data);
        setStatus("success");
      } catch (err) {
        const message = err instanceof Error ? err.message : "";
        const mapped = errorMap[message];
        setErrors({ form: [mapped ?? message ?? "Une erreur est survenue"] });
        setStatus("idle");
      }
    },
    [setErrors, schema, fields, onSubmit, errorMap],
  );

  return {
    fields,
    setField,
    loading: status === "loading",
    success: status === "success",
    errors,
    errorMessages,
    handleSubmit,
  };
}