"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { COLORS } from "../../constants/constants";
import styles from "./ColorSelector.module.css";
import { Card, Heading, Text } from "@/components/ui";
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
 * une nouvelle via une fenêtre modale.
 *
 * États visuels :
 * - Pastille au repos : couleur pleine, anneau transparent.
 * - Pastille survolée : léger agrandissement + nom de la couleur affiché en dessous.
 * - Pastille sélectionnée : anneau contrasté + coche superposée, conservés même au survol.
 */
export function ColorSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  /** Sélectionne une couleur et referme la modale. */
  const handleSelect = (color: Color) => {
    onChange(color);
    setOpen(false);
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
