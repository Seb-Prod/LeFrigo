import { Badge, Card } from "@/components/ui";
import { UserSession } from "@lefrigo/shared";
import { LogoutButton } from "../../../auth/components/LogoutButton/LogoutButton";
import { SessionMeta } from "../_shared/SessionMeta";
import { SessionHeader } from "../_shared/SessionHeader";
import styles from "./SessionCard.module.css";

type Props = {
  session: UserSession;
  isCurrent?: boolean;
  onRevoke?: () => void;
};

/**
 * Affiche les informations d'une session utilisateur.
 * La session courante est mise en avant visuellement avec un dot vert.
 * Un bouton de révocation est affiché pour les sessions non courantes.
 */
export function SessionCard({ session, isCurrent = false, onRevoke }: Props) {
  return (
    <Card variant={isCurrent ? "primary" : "default"}>

      {/* ── En-tête : navigateur + badge type de session ── */}
      <div className={styles.header}>
        <div className={styles.browserInfo}>
          <SessionHeader session={session} isCurrent={isCurrent} />
        </div>
        <Badge className={styles.badge} variant={session.rememberMe ? "info" : "default"}>
          {session.rememberMe ? "Remember me" : "Session courte"}
        </Badge>
      </div>

      {/* ── Pied : métadonnées + bouton révoquer ────────── */}
      <div className={styles.footer}>
        <div className={styles.meta}>
          <SessionMeta session={session} />
        </div>
        {!isCurrent && onRevoke && (
          <LogoutButton onClick={onRevoke} size="sm">
            Déconnecter
          </LogoutButton>
        )}
      </div>

    </Card>
  );
}