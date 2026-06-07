"use client";

import { Alert, Heading, Text } from "@/components/ui";
import styles from "./VerifyEmail.module.css";
import { TbMailCheck, TbMailX } from "react-icons/tb";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";

type Props = { token: string };

export function VerifyEmail({ token }: Props) {
  const { loading, error, errorMessage } = useVerifyEmail(token);


  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <TbMailCheck className={styles.icon} />
          <Heading align="center">Vérification en cours…</Heading>
          <Text align="center" size="lg">
            Nous confirmons votre adresse e-mail, cela ne prendra qu&apos;un instant.
          </Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <TbMailX className={styles.icon} />
          <Heading align="center">Lien invalide ou expiré</Heading>
          <Text align="center" size="lg">
            Ce lien de vérification n&apos;est plus valide. Veuillez en demander un nouveau.
          </Text>
          <Alert variant="error">
            <ul>
                <li>{errorMessage}</li>
            </ul>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <TbMailCheck className={styles.icon} />
        <Heading align="center">E-mail confirmé !</Heading>
        <Text align="center" size="lg">
          Votre adresse e-mail a bien été vérifiée. Vous pouvez maintenant accéder à votre compte.
        </Text>
      </div>
    </div>
  );
}