import { FormCard, InputPassword } from "@/components/ui";
import { TbLockQuestion } from "react-icons/tb";
import { useChangePassword } from "./useChangePassword";

export function ChangePassword() {
  const {
    fields,
    errors,
    errorMessages,
    setField,
    loading,
    handleChangePassword,
  } = useChangePassword();

  return (
    <FormCard
      icon={<TbLockQuestion />}
      title="Changer de mot de passe"
      description="Changement du mot de passe révoquera toutes vos sessions sur d'autre appareil."
      buttonLabel="Changer de mot de passe"
      buttonLoadingLabel="Changement du mot de passe en cours..."
      onSubmit={handleChangePassword}
      errorMessages={errorMessages}
      disabled={loading}
    >
      {/* –– Champs –– */}
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
        placeholder="Confirme mot de passe"
        required
        error={!!errors.confirmNewPassword}
        value={fields.confirmNewPassword}
        onChange={setField("confirmNewPassword")}
      />
    </FormCard>
  );
}
