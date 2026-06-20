"use client";

import type { RecipeStepDto } from "@lefrigo/shared";
import { StepActions } from "../StepActions";
import styles from "./StepList.module.css";
import { Badge, Text } from "@/components/ui";


/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  steps: RecipeStepDto[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
};

/**
 * Liste ordonnée des étapes de préparation confirmées.
 *
 * Purement présentationnel — la logique de réordonnancement
 * et de suppression reste dans RecipeFormStep3.
 */
export function StepList({ steps, onMoveUp, onMoveDown, onRemove }: Props) {
  if (steps.length === 0) return null;

  return (
    <ol className={styles.list}>
      {steps.map((step, index) => (
        <li key={index} className={styles.item}>
          {/* ── Numéro ── */}
          <Badge color="danger">{step.position}</Badge>

          {/* ── Instruction ── */}
          <Text className={styles.instruction}>{step.instruction}</Text>

          {/* ── Actions ── */}
          <StepActions
            position={step.position}
            isFirst={index === 0}
            isLast={index === steps.length - 1}
            onMoveUp={() => onMoveUp(index)}
            onMoveDown={() => onMoveDown(index)}
            onRemove={() => onRemove(index)}
          />
        </li>
      ))}
    </ol>
  );
}