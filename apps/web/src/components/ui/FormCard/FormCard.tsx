import { useBack } from "@/hooks";
import { ButtonPrev } from "../ButtonIcon";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Button } from "../Button/Button";
import { Alert } from "../Alert";
import styles from "./FormCard.module.css";
import { useDevice } from "@/contexts/device.context";
import { usePathname } from "next/navigation";
import { getPageConfig } from "@/lib/navigation";
import { Modal } from "../Modal";
import { useState } from "react";
import { ConfirmDialog } from "../ConfirmDialog";
import clsx from 'clsx';

/* ── Types ────────────────────────────────────────────────── */

type Props = {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  /** Soumettre le formulaire — si absent, rendu en `<div>` au lieu de `<form>` */
  onSubmit?: (e: React.SubmitEvent) => void;
  /** Texte du bouton de soumission — si absent, le bouton n'est pas rendu */
  buttonLabel?: string;
  /** Texte affiché à la place de `buttonLabel` pendant le chargement */
  buttonLoadingLabel?: string;
  /** Désactive le bouton et affiche `buttonLoadingLabel` */
  disabled?: boolean;
  /** Messages d'erreur globaux affichés sous le bouton */
  errorMessages?: string[];
  /** Affiche le bouton retour — à passer depuis `useDevice().isMobile` */
  /** Texte du bouton retour inline — si absent, le bouton n'est pas rendu */
  backLabel?: string;
  /** Handler du bouton retour inline */
  onBack?: () => void;
};

/* ── Composant ────────────────────────────────────────────── */

/**
 * Structure commune à tous les formulaires et écrans d'authentification.
 *
 * - Rend un `<form>` si `onSubmit` est fourni, un `<div>` sinon (états statiques)
 * - Affiche optionnellement : icône, titre, description, bouton retour mobile
 * - Gère le bouton de soumission avec état loading via `disabled` + `buttonLoadingLabel`
 * - Affiche les erreurs globales sous le bouton via `errorMessages`
 */
export function FormCard({
  icon,
  title,
  description,
  children,
  onSubmit,
  buttonLabel,
  buttonLoadingLabel,
  disabled,
  errorMessages,
  backLabel,
  onBack,
}: Props) {
  const { isPWA, isMobile } = useDevice();
  const pathname = usePathname();
  const page = getPageConfig(pathname);
  const confirmationModal = page.confirmationModal;
  const goBack = useBack();

  const [confirmBackOpen, setConfirmBackOpen] = useState(false);

  /** Header visible sur mobile et PWA uniquement */
  const showHeader = isPWA || isMobile;

  {
    /* ── Contenu partagé form / div ── */
  }
  const content = (
    <>
      {/* ── Header (mobile/PWA uniquement) ── */}
      {showHeader && (
        <div className={styles.header}>
          {/* ── Titre + retour (PWA uniquement — la Topbar web gère déjà ça) ── */}
          {isPWA && (
            <>
              {page.showBackButton && (
                <ButtonPrev
                  className={styles.backButton}
                  onClick={() => {
                    if (confirmationModal) {
                      setConfirmBackOpen(true);
                    } else {
                      goBack();
                    }
                  }}
                />
              )}
            </>
          )}
        </div>
      )}

      {/* ── Icône ── */}
      {icon && <div className={styles.icon}>{icon}</div>}

      {/* ── Titre et description ── */}
      {title && <Heading align="center">{title}</Heading>}
      {description && (
        <Text align="center" size="lg">
          {description}
        </Text>
      )}

      {/* ── Contenu variable (inputs, boutons custom…) ── */}
      {children}

      {/* ── Bouton(s) de soumission ── */}
      {buttonLabel && (
        <div
          className={clsx(styles.actions, onBack && styles.actionsWithBack)}
        >
          {onBack && backLabel && (
            <Button type="button" variant="ghost" onClick={onBack}>
              {backLabel}
            </Button>
          )}
          <Button type="submit" disabled={disabled}>
            {disabled && buttonLoadingLabel ? buttonLoadingLabel : buttonLabel}
          </Button>
        </div>
      )}

      {/* ── Erreurs globales ── */}
      {errorMessages && errorMessages.length > 0 && (
        <Alert color="error">
          <ul>
            {errorMessages.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      {/* –– Modal de confirmation (backButtun) –– */}
      {confirmationModal && (
        <ConfirmDialog
          open={confirmBackOpen}
          title={confirmationModal.title}
          description={confirmationModal.description}
          confirmLabel={confirmationModal.confirmLabel}
          cancelLabel={confirmationModal.cancelLabel}
          onClose={() => setConfirmBackOpen(false)}
          onConfirm={() => {
            setConfirmBackOpen(false);

            goBack();
          }}
        />
      )}
    </>
  );

  {
    /* ── Wrapper : form si soumission, div sinon ── */
  }
  return (
    <div className={styles.wrapper}>
      {onSubmit ? (
        <form className={styles.form} onSubmit={onSubmit}>
          {content}
        </form>
      ) : (
        <div className={styles.form}>{content}</div>
      )}
    </div>
  );
}
