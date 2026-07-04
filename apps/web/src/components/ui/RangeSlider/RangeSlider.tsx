"use client"

import { useState } from "react";
import styles from "./RangeSlider.module.css";

/**
 * Slider de sélection d'une valeur numérique dans une plage [min, max].
 * Affiche un label et la valeur courante au-dessus de la piste.
 * La bulle de sélection (selector) n'est visible que pendant le glissement
 * du curseur (mousedown/touchstart -> mouseup/touchend).
 *
 * États visuels :
 * - Repos : uniquement la barre de progression et le thumb natif
 * - Glissement (isDragging) : la bulle "selector" apparaît au-dessus du thumb
 */
export function RangeSlider({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  /** Indique si l'utilisateur est en train de glisser le curseur */
  const [isDragging, setIsDragging] = useState(false);

  /** Position en % de la valeur courante dans la plage [min, max] */
  const percent = ((value - min) / (max - min)) * 100;

  /** Met à jour la valeur lors du déplacement du slider natif */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  /** Active l'affichage du selector au début du glissement */
  const handleDragStart = () => setIsDragging(true);

  /** Masque le selector à la fin du glissement */
  const handleDragEnd = () => setIsDragging(false);

  const selectorClassName = [styles.selector, isDragging ? styles.selectorVisible : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.range}>
      {/* ── Label + valeur courante ── */}
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.min}>
          Min
          <span>{min}</span>
        </div>

        <div className={styles.rangeInput}>
          {/* ── Bulle affichée uniquement pendant le drag ── */}
          <div className={selectorClassName} style={{ left: `${percent}%` }}>
            <div className={styles.selectValue}>{value}</div>
            <div className={styles.selectBtn}></div>
          </div>

          {/* ── Barre de progression proportionnelle à la valeur ── */}
          <div className={styles.progressBar} style={{ width: `${percent}%` }}></div>

          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            aria-label={label}
            className={styles.sliderInput}
          />
        </div>

        <div className={styles.max}>
          Max
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
}