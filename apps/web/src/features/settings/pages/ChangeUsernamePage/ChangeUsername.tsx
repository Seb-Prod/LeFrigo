"use client";

import { Alert, Button, FormCard, InputUserName } from "@/components/ui";
import { TbLockCheck, TbLockQuestion, TbUserQuestion } from "react-icons/tb";
import { useChangeUsername } from "./useChangeUsername";
import { useBack } from "@/hooks";

export function ChangeUsername() {
  const {
    fields,
    errors,
    errorMessages,
    setField,
    loading,
    success,
    handleSubmit,
  } = useChangeUsername();

  const goBack = useBack();

  {/* ── État succès ── */}
    if (success) {
      return (
        <FormCard icon={<TbLockCheck />} title="Nom d'utilisateur cmodifié !">
          <Alert color="success">
            Votre nom d&apos;utilisateur a bien été modifié.
          </Alert>
          <Button onClick={goBack}>Retour</Button>
        </FormCard>
      );
    }

  
    return (
        <FormCard
          icon={<TbLockQuestion />}
          title="Changer de mot de passe"
          description="Une fois modifié, toutes vos sessions sur les autres appareils seront révoquées."
          buttonLabel="Changer de mot de passe"
          buttonLoadingLabel="Changement en cours..."
          onSubmit={handleSubmit}
          errorMessages={errorMessages}
          disabled={loading}
        >
          {/* ── Champs ── */}
          <InputUserName
            placeholder="Ancien mot de passe"
            required
            error={!!errors.userName}
            value={fields.userName}
            onChange={setField("userName")}
          />
          
        </FormCard>
  );
}
