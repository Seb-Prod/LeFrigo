"use client";

import { COLORS } from "../../constants/constants";
import styles from "./ColorSelector.module.css";
import { Card, Heading } from "@/components/ui";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";

type Color = (typeof COLORS)[number];

type Props = {
  value: Color;
  onChange: (value: Color) => void;
};

/** Libellés affichés au survol de chaque pastille de couleur. */
const COLOR_LABELS: Record<Color, string> = {
  primary: "Aubergine",
  accent: "Miel",
  success: "Vert",
  warning: "Jaune",
  danger: "Rouge",
  info: "Bleu",
  neutral: "Gris",
} as Record<Color, string>;

/**
 * Sélecteur de couleur.
 *
 * Affiche la couleur actuellement sélectionnée et permet d'en choisir
 * une nouvelle.
 */
export function ColorSelector({ value, onChange }: Props) {
  const handleSelect = (color: Color) => {
    onChange(color);
  };

  return (
    <Card>
      <Heading>Couleur</Heading>

      {/* ── Grille des pastilles de couleur ── */}
      <div className={styles.buttons}>
        {COLORS.map((color) => {
          const isSelected = color === value;

          /** Classes conditionnelles du bouton (état sélectionné). */
          const buttonClassName = [
            styles.button,
            isSelected ? styles.selected : "",
          ].join(" ");

          return (
            <div
              key={color}
              className={clsx(
                styles.colorItem,
                isSelected ? styles.colorItemSelected : "",
              )}
            >
              <button
                type="button"
                className={buttonClassName}
                data-color={color}
                aria-label={COLOR_LABELS[color]}
                aria-pressed={isSelected}
                onClick={() => handleSelect(color)}
              >
                <span
                  className={clsx(
                    styles.checkmark,
                    !isSelected ? styles.checkmarkMuted : "",
                  )}
                >
                  <FaCheck />
                </span>
              </button>

              {/* Nom de la couleur, révélé au survol / focus */}
              <span className={styles.label}>{COLOR_LABELS[color]}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
