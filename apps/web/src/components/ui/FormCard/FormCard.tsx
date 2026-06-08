import { useBack } from "@/hooks";
import { ButtonPrev } from "../ButtonIcon";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Button } from "../Button/Button";
import { Alert } from "../Alert";
import styles from "./FormCard.module.css";

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
  isMobile?: boolean;
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
  isMobile,
}: Props) {
  const goBack = useBack();

  {/* ── Contenu partagé form / div ── */}
  const content = (
    <>
      {/* ── Bouton retour (mobile uniquement) ── */}
      {isMobile && <ButtonPrev onClick={goBack} />}

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

      {/* ── Bouton de soumission ── */}
      {buttonLabel && (
        <Button type="submit" disabled={disabled}>
          {disabled && buttonLoadingLabel ? buttonLoadingLabel : buttonLabel}
        </Button>
      )}

      {/* ── Erreurs globales ── */}
      {errorMessages && errorMessages.length > 0 && (
        <Alert variant="error">
          <ul>
            {errorMessages.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}
    </>
  );

  {/* ── Wrapper : form si soumission, div sinon ── */}
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