import { useState } from "react";

export function useFormErrors<T extends Record<string, string[]>>() {
  const [errors, setErrors] = useState<T>({} as T);

  const clearFieldError = (field: keyof T) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const errorMessages = Object.values(errors).flat();

  return { errors, setErrors, clearFieldError, errorMessages };
}