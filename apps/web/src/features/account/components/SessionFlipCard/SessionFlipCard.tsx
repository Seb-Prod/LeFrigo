import clsx from "clsx";
import { useState } from "react";
import { ButtonClose, ButtonInfo } from "@/components/ui";
import { LogoutButton } from "@/features/auth";
import { UserSession } from "@lefrigo/shared";
import { SessionMeta } from "../_shared/SessionMeta";
import { SessionHeader } from "../_shared/SessionHeader";
import styles from "./SessionFlipCard.module.css";

type Props = {
  session: UserSession;
  isCurrent?: boolean;
  onRevoke?: () => void;
};

/**
 * Card de session avec effet flip 3D.
 * Recto : aperçu rapide (appareil, navigateur, activité).
 * Verso : détails complets + bouton de révocation.
 */
export function SessionFlipCard({ session, isCurrent = false, onRevoke }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={styles.scene}>
      {/* Conteneur 3D */}
      <div className={clsx(styles.card, flipped && styles.flipped)}>

        {/* ── Recto ───────────────────────────────────────── */}
        <div className={clsx(styles.cardFace, styles.cardFaceFront)}>
          <div className={styles.cardHeader}>
            <ButtonInfo size="sm" onClick={() => setFlipped(true)} />
          </div>
          <div className={styles.browserInfo}>
            <SessionHeader session={session} isCurrent={isCurrent} layout="column" size={24} />
          </div>
        </div>

        {/* ── Verso ───────────────────────────────────────── */}
        <div className={clsx(styles.cardFace, styles.cardFaceBack)}>
          <div className={styles.cardHeader}>
            <ButtonClose size="sm" onClick={() => setFlipped(false)} />
          </div>
          <div className={styles.footer}>
            <SessionMeta session={session} />
          </div>
          {!isCurrent && onRevoke && (
            <LogoutButton onClick={onRevoke} size="sm" open className={styles.buttonRevoke}>
              Déconnecter
            </LogoutButton>
          )}
        </div>

      </div>
    </div>
  );
}