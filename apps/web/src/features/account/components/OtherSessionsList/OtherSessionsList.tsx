import { UserSession } from "@lefrigo/shared";
import styles from "./OtherSessionList.module.css";
import { SessionCard } from "../SessionCard";
import { Alert, Badge, Heading } from "@/components/ui";
import { LogoutButton } from "@/features/auth";

type Props = {
  sessions?: UserSession[];
  onRevoke?: (id: string) => void;
  onRevokeAll?:() => void;
};

/**
 * Affiche la liste des sessions actives autres que la session courante.
 * Affihce un message si aucune session à afficher.
 */
export function OtherSessionsList({ sessions, onRevoke, onRevokeAll }: Props) {
  if (!sessions || sessions.length === 0) return (
    <Alert variant="info">Aucune autre session</Alert>
  );

  return (
    <section className={styles.section}>
      <Heading size="sm" variant="muted">
        Autres sessions{" "}
        <Badge variant="info">{sessions.length}</Badge>
      </Heading>
      <div className={styles.list}>
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onRevoke={() => onRevoke?.(session.id)}
          />
        ))}
      </div>
      {onRevokeAll && (
        <LogoutButton onClick={onRevokeAll} size="sm">
          Déconnecter tous les appareils
        </LogoutButton>
      )}
    </section>
  );
}