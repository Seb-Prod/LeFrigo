// features/account/components/SessionDrawer/SessionDrawer.tsx

import { UserSession } from "@lefrigo/shared";
import { LogoutButton } from "@/features/auth";
import { SessionMeta } from "../_shared/SessionMeta";
import { SessionHeader } from "../_shared/SessionHeader";
import styles from "./SessionDrawer.module.css";

type Props = {
  session: UserSession | null;
  isCurrent?: boolean;
  onClose: () => void;
  onRevoke?: () => void;
};

/**
 * Drawer affichant le détail d'une session.
 * Glisse depuis le bas sur mobile.
 * Affiche SessionMeta et un bouton de révocation pour les sessions non courantes.
 */
export function SessionDrawer({ session, isCurrent = false, onClose, onRevoke }: Props) {
  if (!session) return null;

  return (
    <>
      {/* ── Overlay ──────────────────────────────────────── */}
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />

      {/* ── Drawer ───────────────────────────────────────── */}
      <div className={styles.drawer} role="dialog" aria-modal="true">
        <div className={styles.handle} aria-hidden="true" />

        {/* En-tête */}
        <div className={styles.header}>
          <div className={styles.title}>
            <SessionHeader session={session} isCurrent={isCurrent} />
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        {/* Métadonnées */}
        <div className={styles.meta}>
          <SessionMeta session={session} />
        </div>

        {/* Révoquer */}
        {!isCurrent && onRevoke && (
          <LogoutButton onClick={onRevoke} size="sm" open className={styles.revokeBtn}>
            Révoquer cette session
          </LogoutButton>
        )}
      </div>
    </>
  );
}