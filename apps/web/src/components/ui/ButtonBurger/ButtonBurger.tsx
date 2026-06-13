import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./ButtonBurger.module.css";

type Props = {
  onClick: () => void;
  className?: string;
  isOpen?: boolean;
};

/**
 * ButtonBurger
 * Bouton hamburger animé (transformation en croix + cercle qui se trace
 * en fond) basé sur https://codepen.io (animation "open"/"closed").
 * `mounted` évite que l'animation "closed" ne se joue au premier rendu
 * si `isOpen` démarre à `false`.
 */
export function ButtonBurger({ className, onClick, isOpen }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      onClick={onClick}
      className={clsx(
        styles.hamburger,
        className,
        mounted && (isOpen ? styles.open : styles.closed),
      )}
    >
      <div className={styles.burgerMain}>
        <div className={styles.burgerInner}>
          <span className={styles.top}></span>
          <span className={styles.mid}></span>
          <span className={styles.bot}></span>
        </div>
      </div>

      {/* ── Cercle de fond animé (trait qui se trace) ── */}
      <div className={styles.svgMain}>
        <svg className={styles.svgCircle} viewBox="0 0 48 48">
          <path
            className={styles.path}
            d="M24,2 a22,22 0 1,1 -0.01,0"
            fill="none"
            stroke="var(--color-danger-solid)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );
}