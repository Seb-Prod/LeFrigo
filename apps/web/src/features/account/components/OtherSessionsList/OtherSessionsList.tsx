import { UserSession } from "@lefrigo/shared";
import { Alert, Badge, Heading, MenuGroup, MenuItem } from "@/components/ui";
import { LogoutButton } from "@/features/auth";
import { SessionFlipCard } from "../SessionFlipCard";
import styles from "./OtherSessionList.module.css";

type Props = {
  sessions?: UserSession[];
  onRevoke?: (id: string) => void;
  onRevokeAll?: () => void;
};

/**
 * Affiche la liste des sessions actives autres que la session courante.
 * Affiche un message si aucune session à afficher.
 */
export function OtherSessionsList({ sessions, onRevoke, onRevokeAll }: Props) {
  if (!sessions || sessions.length === 0)
    return <Alert variant="info">Aucune autre session</Alert>;

  return (
    <section className={styles.section}>
      <MenuGroup title="Autres Sessions">
        {sessions.map((session) => (
          
          <MenuItem key={session.id} label={session.ip ? session.ip : ""}></MenuItem>
        ))}
      </MenuGroup>
      {/* ── En-tête : titre + compteur ───────────────────── */}
      {/* <Heading size="sm" variant="muted">
        Autres sessions{" "}
        <Badge variant="info">{sessions.length}</Badge>
      </Heading> */}

      {/* ── Grille de sessions ───────────────────────────── */}
      {/* <div className={styles.list}>
        {sessions.map((session) => (
          <SessionFlipCard
            key={session.id}
            session={session}
            onRevoke={() => onRevoke?.(session.id)}
          />
        ))}
      </div> */}

      {/* ── Révoquer toutes les sessions ────────────────── */}
      {/* {onRevokeAll && (
        <LogoutButton onClick={onRevokeAll} size="md" open className={styles.buttonRevoke}>
          Déconnecter tous les appareils
        </LogoutButton>
      )} */}
    </section>
  );
}
