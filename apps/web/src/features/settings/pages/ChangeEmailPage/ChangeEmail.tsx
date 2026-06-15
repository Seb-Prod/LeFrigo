// features/settings/ChangeEmail/ChangeEmail.tsx

import { Alert, FormCard, InputEmail, InputPassword } from "@/components/ui";
import { LuMailQuestion } from "react-icons/lu";
import { useChangeEmail } from "./useChangeEmail";

/**
 * Formulaire de changement d'adresse e-mail.
 *
 * États visuels :
 * - idle    : formulaire vide, bouton actif
 * - loading : bouton en cours, champs désactivés
 * - success : message de confirmation (un e-mail a été envoyé)
 * - error   : alerte avec le message d'erreur
 *
 * TODO: brancher useChangeEmail sur l'endpoint PATCH /auth/change-email
 */
export function ChangeEmail() {
  const { fields, status, error, setField, submit } = useChangeEmail();

  return (
    <FormCard
      icon={<LuMailQuestion />}
      title="Changer d'adresse e-mail"
      description="Un e-mail de confirmation sera envoyé à ta nouvelle adresse."
      buttonLabel="Changer l'e-mail"
      buttonLoadingLabel="Changement en cours..."
      onSubmit={submit}
      disabled={status === "loading" || status === "success"}
    >

      {/* ── Champs ── */}
      <InputEmail
        placeholder="Nouvelle adresse e-mail"
        value={fields.email}
        onChange={(e) => setField("email", e.target.value)}
        disabled={status === "loading"}
      />
      <InputEmail
        placeholder="Confirmer l'adresse e-mail"
        value={fields.confirmEmail}
        onChange={(e) => setField("confirmEmail", e.target.value)}
        disabled={status === "loading"}
      />
      <InputPassword
        placeholder="Mot de passe actuel"
        value={fields.password}
        onChange={(e) => setField("password", e.target.value)}
        disabled={status === "loading"}
      />

      {/* ── Feedback ── */}
      {error && <Alert color="error">{error}</Alert>}
      {status === "success" && (
        <Alert color="success">
          Un e-mail de confirmation a été envoyé à <strong>{fields.email}</strong>.
          Clique sur le lien pour valider le changement.
        </Alert>
      )}

    </FormCard>
  );
}