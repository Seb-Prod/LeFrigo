"use client";

import { RecipeFormStep1 } from "../../components/RecipeFormStep1";
import { RecipeFormStep2 } from "../../components/RecipeFormStep2";
import { RecipeFormStep3 } from "../../components/RecipeFormStep3";
import { useCreateRecipe } from "../../hooks/useCreateRecipe";
import { Alert, Button, FormCard } from "@/components/ui";
import { TbChefHat } from "react-icons/tb";
import { useBack } from "@/hooks";
import styles from "./CreateRecipePage.module.css";

/**
 * Page de création de recette multi-étapes.
 *
 * Orchestre les 3 étapes via `useCreateRecipe` :
 * - Étape 1 → infos générales
 * - Étape 2 → ingrédients
 * - Étape 3 → étapes de préparation
 *
 * États visuels :
 * - `step 1|2|3` → formulaire de l'étape courante
 * - `success`    → écran de confirmation
 */
export function CreateRecipePage() {
  const {
    step,
    draft,
    loading,
    success,
    errorMessages,
    goBack,
    submitStep1,
    submitStep2,
    submitStep3,
  } = useCreateRecipe();

  const goBackPage = useBack();

  /* ── État succès ── */
  if (success) {
    return (
      <FormCard icon={<TbChefHat />} title="Recette créée !">
        <Alert color="success">
          Votre recette a bien été créée et est maintenant disponible.
        </Alert>
        <Button onClick={goBackPage}>Retour</Button>
      </FormCard>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* ── Indicateur d'étapes ── */}
      <div className={styles.stepper} aria-label="Progression">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={[
              styles.stepDot,
              step === s && styles.active,
              step > s  && styles.done,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-current={step === s ? "step" : undefined}
          />
        ))}
      </div>

      {/* ── Étapes ── */}
      {step === 1 && (
        <RecipeFormStep1
          defaultValues={{ ...draft }}
          onSubmit={submitStep1}
        />
      )}

      {step === 2 && (
        <RecipeFormStep2
          defaultValues={{ ingredients: draft.ingredients ?? [] }}
          onSubmit={submitStep2}
          onBack={goBack}
        />
      )}

      {step === 3 && (
        <RecipeFormStep3
          defaultValues={{ steps: draft.steps ?? [] }}
          onSubmit={submitStep3}
          onBack={goBack}
          loading={loading}
        />
      )}
    </div>
  );
}