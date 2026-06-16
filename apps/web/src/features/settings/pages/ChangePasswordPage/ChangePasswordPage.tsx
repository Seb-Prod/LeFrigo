import { Alert, Button, FormCard, InputPassword } from "@/components/ui";
import { TbLockCheck, TbLockQuestion } from "react-icons/tb";
import { useChangePassword } from "./useChangePassword";
import { useBack } from "@/hooks";

/**
 * Formulaire de changement de mot de passe pour un utilisateur connecté.
 *
 * États visuels :
 * - `idle / loading` → formulaire avec trois champs (ancien, nouveau, confirmation)
 * - `success`        → écran de confirmation avec bouton retour
 *
 * Délègue toute la logique à `useChangePassword` (validation Zod, appel API, gestion d'erreurs).
 */
export function ChangePassword() {
  const {
    fields,
    errors,
    errorMessages,
    setField,
    loading,
    success,
    handleChangePassword,
  } = useChangePassword();

  const goBack = useBack();

  {/* ── État succès ── */}
  if (success) {
    return (
      <FormCard icon={<TbLockCheck />} title="Mot de passe modifié !">
        <Alert color="success">
          Votre mot de passe a bien été modifié. Les autres appareils ont été
          déconnectés.
        </Alert>
        <Button onClick={goBack}>Retour</Button>
      </FormCard>
    );
  }

  {/* ── Formulaire ── */}
  return (
    <FormCard
      icon={<TbLockQuestion />}
      title="Changer de mot de passe"
      description="Une fois modifié, toutes vos sessions sur les autres appareils seront révoquées."
      buttonLabel="Changer de mot de passe"
      buttonLoadingLabel="Changement en cours..."
      onSubmit={handleChangePassword}
      errorMessages={errorMessages}
      disabled={loading}
    >
      {/* ── Champs ── */}
      <InputPassword
        placeholder="Ancien mot de passe"
        required
        error={!!errors.password}
        value={fields.password}
        onChange={setField("password")}
      />
      <InputPassword
        placeholder="Nouveau mot de passe"
        required
        error={!!errors.newPassword}
        value={fields.newPassword}
        onChange={setField("newPassword")}
      />
      <InputPassword
        placeholder="Confirmer le mot de passe"
        required
        error={!!errors.confirmNewPassword}
        value={fields.confirmNewPassword}
        onChange={setField("confirmNewPassword")}
      />
    </FormCard>
  );
}