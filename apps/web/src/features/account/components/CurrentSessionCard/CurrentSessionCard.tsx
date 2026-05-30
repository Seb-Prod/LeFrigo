import { UserSession } from "@lefrigo/shared";
import styles from "./CurrentSessionCard.module.css";
import { SessionCard } from "../SessionCard";
import { Alert, Heading } from "@/components/ui";


type Props = {
  session?: UserSession;
};

/**
 * Affiche la session courante de l'utilisateur.
 * Si aucune session active n'est trouvée, affiche un message d'erreur.
 */
export function CurrentSessionCard({session}: Props) {
  return (
    <section className={styles.section}>
      <Heading size="sm" variant="muted">Session actuelle</Heading>
      {session ? (
        <SessionCard session={session} isCurrent />
      ) : (
        <Alert variant="error">Session introuvable</Alert>
      )}
    </section>
  );
}
