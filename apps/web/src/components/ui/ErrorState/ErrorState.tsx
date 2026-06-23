import { Text } from "../Text";
import styles from "./ErrorState.module.css";
import { Surface } from "../Surface";
import { TbError404 } from "react-icons/tb";
import { Logo } from "../Logo";
import { Heading } from "../Heading/Heading";
import { NavLink } from "../NavLink";

/* ── Types ──────────────────────────────────────────────────── */

type Props = {
  title?: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
};

/**
 * Écran d'erreur plein écran.
 *
 * États visuels :
 * - Titre absent     : fallback "Une erreur est survenue"
 * - Action absente   : lien retour vers "/"  avec label "Accueil"
 * - Action présente  : lien et label personnalisés
 */
export function ErrorState({
  title = "Une erreur est survenue",
  message,
  actionLabel = "Accueil",
  actionHref = "/",
}: Props) {
  return (
    <Surface fullScreen>
      <div className={styles.content}>

        {/* ── En-tête ── */}
        <div className={styles.header}>
          <Logo size="lg" display="both" />
          <span className={styles.icon} aria-hidden="true">
            <TbError404 />
          </span>
        </div>

        {/* ── Message ── */}
        <Heading size="lg" className={styles.title}>{title}</Heading>
        <Text size="lg">{message}</Text>

        {/* ── Action ── */}
        <NavLink href={actionHref} label={actionLabel} activeStyle/>

      </div>
    </Surface>
  );
}