"use client";

import styles from "./RecipeStepper.module.css";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  /** Appelé uniquement si targetStep < currentStep */
  onStepClick: (step: number) => void;
};

/**
 * Indicateur de progression multi-étapes.
 *
 * États par dot :
 * - `done`    : étape passée — cliquable (retour autorisé)
 * - `active`  : étape courante — non cliquable
 * - (neutre)  : étape future — non cliquable
 */
export function RecipeStepper({ currentStep, totalSteps, labels, onStepClick }: Props) {
  return (
    <div className={styles.stepper} aria-label="Progression">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isDone = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={step} className={styles.stepWrapper}>
            {/* ── Dot ── */}
            <button
              type="button"
              disabled={!isDone}
              onClick={() => isDone && onStepClick(step)}
              className={[
                styles.dot,
                isActive && styles.active,
                isDone && styles.done,
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive ? "step" : undefined}
              aria-label={isDone ? `Retour à l'étape ${step}` : `Étape ${step}`}
            />

            {/* ── Label ── */}
            {labels?.[i] && (
              <span className={[
                styles.label,
                isActive && styles.labelActive,
                isDone && styles.labelDone,
              ]
                .filter(Boolean)
                .join(" ")}
              >
                {labels[i]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}