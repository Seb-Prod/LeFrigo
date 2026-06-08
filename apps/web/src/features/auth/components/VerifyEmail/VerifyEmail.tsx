"use client";

import { Button, FormCard } from "@/components/ui";
import { TbMailCheck, TbMailX } from "react-icons/tb";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
import { AuthForm } from "../AuthForm/AuthForm";
import { useState } from "react";

type Props = { token: string };

export function VerifyEmail({ token }: Props) {
  const { loading, success, alreadyVerified, expired, invalid } = useVerifyEmail(token);
  const [authOpen, setAuthOpen] = useState(false);

  if (loading) {
    return (
      <FormCard
        icon={<TbMailCheck />}
        title="Vérification en cours…"
        description="Nous confirmons votre adresse e-mail, cela ne prendra qu'un instant."
      />
    );
  }

  if (success) {
    return (
      <FormCard
        icon={<TbMailCheck />}
        title="E-mail confirmé !"
        description="Votre adresse e-mail a bien été vérifiée. Vous pouvez maintenant accéder à votre compte."
      >
        <Button onClick={() => setAuthOpen(true)}>Se connecter</Button>
        <AuthForm open={authOpen} onClose={() => setAuthOpen(false)} />
      </FormCard>
    );
  }

  if (alreadyVerified) {
    return (
      <FormCard
        icon={<TbMailCheck />}
        title="Adresse déjà vérifiée"
        description="Votre adresse e-mail a déjà été confirmée. Vous pouvez vous connecter."
      >
        <Button onClick={() => setAuthOpen(true)}>Se connecter</Button>
        <AuthForm open={authOpen} onClose={() => setAuthOpen(false)} />
      </FormCard>
    );
  }

  if (expired) {
    return (
      <FormCard
        icon={<TbMailX />}
        title="Lien expiré"
        description="Ce lien de vérification a expiré. Demandez-en un nouveau."
      >
        <ResendVerification />
      </FormCard>
    );
  }

  // invalid
  return (
    <FormCard
      icon={<TbMailX />}
      title="Lien invalide"
      description="Ce lien de vérification n'est pas valide."
    />
  );
}