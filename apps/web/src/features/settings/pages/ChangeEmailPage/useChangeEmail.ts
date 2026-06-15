// features/settings/ChangeEmail/useChangeEmail.ts

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type Fields = {
  email: string;
  confirmEmail: string;
  password: string;
};

type State = {
  fields: Fields;
  status: Status;
  error: string | null;
};

const INITIAL_FIELDS: Fields = {
  email: "",
  confirmEmail: "",
  password: "",
};

/**
 * Gère le formulaire de changement d'adresse e-mail.
 *
 * Validation client :
 * - Les deux adresses doivent correspondre
 * - Le mot de passe ne doit pas être vide
 *
 * TODO: brancher sur l'endpoint PATCH /auth/change-email
 */
export function useChangeEmail() {
  const [state, setState] = useState<State>({
    fields: INITIAL_FIELDS,
    status: "idle",
    error: null,
  });

  /** Met à jour un champ sans toucher aux autres. */
  function setField(field: keyof Fields, value: string) {
    setState((prev) => ({
      ...prev,
      fields: { ...prev.fields, [field]: value },
      error: null,
    }));
  }

  /** Validation client avant envoi. */
  function validate(): string | null {
    const { email, confirmEmail, password } = state.fields;
    if (!email)                        return "L'adresse e-mail est requise.";
    if (!email.includes("@"))          return "L'adresse e-mail est invalide.";
    if (email !== confirmEmail)        return "Les adresses e-mail ne correspondent pas.";
    if (!password)                     return "Le mot de passe est requis.";
    return null;
  }

  async function submit() {
    const validationError = validate();
    if (validationError) {
      setState((prev) => ({ ...prev, error: validationError }));
      return;
    }

    setState((prev) => ({ ...prev, status: "loading", error: null }));

    try {
      // TODO: appel API
      // await api.patch("/auth/change-email", {
      //   email: state.fields.email,
      //   password: state.fields.password,
      // });
      setState((prev) => ({ ...prev, status: "success" }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: "Une erreur est survenue. Réessaie plus tard.",
      }));
    }
  }

  return {
    fields:  state.fields,
    status:  state.status,
    error:   state.error,
    setField,
    submit,
  };
}