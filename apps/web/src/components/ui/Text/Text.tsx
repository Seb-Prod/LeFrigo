import clsx from "clsx";
import styles from "./Text.module.css";

type Props = {
  as?: "p" | "span" | "label" | "div";
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "secondary" | "muted" | "danger";
  align?: "left" | "center" | "right" | "justify";
  children: React.ReactNode;
  className?: string;
};

/**
 * Composant typographique polyvalent.
 *
 * - `as` permet de choisir la balise HTML sémantique (`p`, `span`, `label`)
 * - `size` contrôle la taille de police
 * - `variant` contrôle la couleur selon le contexte sémantique
 * - `align` contrôle l'alignement du texte
 */
export function Text({
  as: Tag = "p",
  size = "md",
  variant = "default",
  align = "left",
  children,
  className,
}: Props) {
  return (
    <Tag
      className={clsx(
        styles.text,
        styles[size],
        styles[variant],
        styles[align],
        className,
      )}
    >
      {children}
    </Tag>
  );
}