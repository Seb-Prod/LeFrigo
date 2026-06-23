import { useAuth } from "@/contexts/auth.context";
import { useFormErrors } from "@/hooks/useFormErrors";
import { useState } from "react";
import { authService } from "../services/auth.service";
import {
  loginSchema,
  registerSchema,
  zodErrorsToRecord,
} from "@lefrigo/shared";

/* ── Labels UI ────────────────────────────────────────────── */

/** Textes affichés dans le formulaire selon le mode actif. */
const LABELS = {
  login: {
    heading: "Connectez-vous à votre compte",
    question: "Pas encore de compte ?",
    toggle: "Créez-en un",
    button: "Se connecter",
    buttonLoading: "Connexion en cours...",
    checkbox: "Se souvenir de moi",
    linkLabel: "Mot de passe oublié ?",
    link: "/forgot-password",
  },
  register: {
    heading: "Créez un compte gratuitement",
    question: "Déjà un compte ?",
    toggle: "Connectez-vous",
    button: "Créer un compte",
    buttonLoading: "Création en cours...",
    checkbox: "Accepter les conditions d'utilisation",
    linkLabel: "Voir les conditions d'utilisation",
    link: "/terms",
  },
} as const;

/* ── Types ────────────────────────────────────────────────── */

type FormMode = "login" | "register";

/** Cycle de vie :
 *  idle → loading → idle (erreur) | success (register OK) */
type FormState = "idle" | "loading" | "success";

/* ── État initial des champs ──────────────────────────────── */

const INITIAL_FIELDS = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  rememberMe: false,
  accept: false,
};

/* ── Hook ─────────────────────────────────────────────────── */

/**
 * Gère l'état et la logique de la modal d'authentification (login / register).
 *
 * - Bascule entre les modes `login` et `register` via `handleToggleMode`
 * - Valide les champs via les schémas Zod partagés (`loginSchema`, `registerSchema`)
 * - Appelle `authService` et propage les erreurs dans `useFormErrors`
 * - Expose `label` pour piloter les textes UI selon le mode actif
 * - Expose `formState` pour piloter les états visuels (loading, success)
 *
 * @param onSuccess - Callback déclenché après un login réussi (ex: fermer la modal)
 */
export function useAuthForm(onSuccess?: () => void, initialMode: FormMode = "login") {
  const { login } = useAuth();

  const [mode, setMode] = useState<FormMode>(initialMode);
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();

  /* ── Helpers ────────────────────────────────────────────── */

  /**
   * Retourne un handler onChange pour le champ donné.
   * Gère à la fois les inputs texte et les checkboxes.
   * Efface l'erreur Zod du champ à chaque frappe.
   */
  const setField =
    <K extends keyof typeof INITIAL_FIELDS>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({
        ...prev,
        [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
      clearFieldError(key);
    };

  /** Bascule entre login et register en réinitialisant tous les états. */
  const handleToggleMode = () => {
    setMode((current) => (current === "login" ? "register" : "login"));
    setFields(INITIAL_FIELDS);
    setErrors({});
    setFormState("idle");
  };

  /* ── Handlers de soumission ─────────────────────────────── */

  /** Soumet le formulaire de connexion après validation Zod. */
  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrors({});

    const result = loginSchema.safeParse(fields);
    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error));
      setFormState("idle");
      return;
    }

    try {
      login(await authService.login(result.data));
      onSuccess?.();
    } catch (err) {
      setErrors({
        form: [err instanceof Error ? err.message : "Une erreur est survenue"],
      });
      setFormState("idle");
    }
  };

  /** Soumet le formulaire d'inscription après validation Zod. */
  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrors({});

    const result = registerSchema.safeParse(fields);
    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error));
      setFormState("idle");
      return;
    }

    try {
      await authService.register(result.data);
      setFormState("success");
    } catch (err) {
      setErrors({
        form: [err instanceof Error ? err.message : "Une erreur est survenue"],
      });
      setFormState("idle");
    }
  };

  /* ── Retour ─────────────────────────────────────────────── */

  return {
    mode,
    formState,
    fields,
    errors,
    errorMessages,
    label: LABELS[mode],
    loading: formState === "loading",
    success: formState === "success",
    setField,
    handleToggleMode,
    handleLogin,
    handleRegister,
  };
}