"use client";

import { RecipeFormStep1 } from "../../components/forms/RecipeFormStep1";
import { RecipeFormStep2 } from "../../components/forms/RecipeFormStep2";
import { RecipeFormStep3 } from "../../components/forms/RecipeFormStep3";
import { useCreateRecipe } from "../../hooks/useCreateRecipe";
import { Alert, Button, FormCard } from "@/components/ui";
import { TbChefHat } from "react-icons/tb";
import { useBack } from "@/hooks/useBack";
import { RecipeStepper } from "../../components/forms/RecipeStepper";

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
    goToStep,
  } = useCreateRecipe();

  const goBackPage = useBack();

  const stepper = (
    <RecipeStepper
      currentStep={step}
      totalSteps={3}
      labels={["Infos", "Ingrédients", "Étapes"]}
      onStepClick={goToStep}
    />
  );

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
    <>
      {/* ── Étapes ── */}
      {step === 1 && (
        <RecipeFormStep1
          defaultValues={{ ...draft }}
          onSubmit={submitStep1}
          stepper={stepper}
        />
      )}

      {step === 2 && (
        <RecipeFormStep2
          defaultValues={{ ingredients: draft.ingredients ?? [] }}
          onSubmit={submitStep2}
          onBack={goBack}
          stepper={stepper}
        />
      )}

      {step === 3 && (
        <RecipeFormStep3
          defaultValues={{ steps: draft.steps ?? [] }}
          onSubmit={submitStep3}
          onBack={goBack}
          loading={loading}
          stepper={stepper}
        />
      )}
    </>
  );
}
