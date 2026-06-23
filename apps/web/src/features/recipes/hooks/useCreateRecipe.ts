import { useCallback, useState } from "react";
import { useFormErrors } from "@/hooks/useFormErrors";
import {
  CreateRecipeDto,
  RecipeInfoDto,
  RecipeIngredientsDto,
  RecipeStepsDto,
  recipeInfoSchema,
  recipeIngredientsSchema,
  recipeStepsSchema,
  zodErrorsToRecord,
} from "@lefrigo/shared";
import { recipeService } from "../services/recipe.service";

/* ── Types ─────────────────────────────────────────────────── */

/** Progression linéaire : 1 → 2 → 3 → submitted */
type Step = 1 | 2 | 3;

type Status = "idle" | "loading" | "success" | "error";

/** Accumulation des données au fil des étapes */
type RecipeDraft = Partial<CreateRecipeDto>;

/* ── Constantes ─────────────────────────────────────────────── */

const INITIAL_DRAFT: RecipeDraft = {
  name: "",
  description: undefined,
  preparationTime: undefined,
  cookingTime: undefined,
  servings: undefined,
  ingredients: [],
  steps: [],
};

/* ── Hook ───────────────────────────────────────────────────── */

/**
 * Gère la state machine du formulaire multi-étapes de création de recette.
 *
 * - Étape 1 : infos générales → validées par `recipeInfoSchema`
 * - Étape 2 : ingrédients     → validés par `recipeIngredientsSchema`
 * - Étape 3 : étapes          → validées par `recipeStepsSchema`
 *
 * Les données sont accumulées dans `draft` au fil des étapes.
 * La soumission finale n'est déclenchée qu'à la validation de l'étape 3.
 */
export function useCreateRecipe() {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [draft, setDraft] = useState<RecipeDraft>(INITIAL_DRAFT);
  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();

  /* ── Navigation ── */

  const goBack = useCallback(() => {
    setErrors({});
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
  }, [setErrors]);

  const goToStep = useCallback(
    (target: number) => {
      if (target < step) {
        setErrors({});
        setStep(target as Step);
      }
    },
    [step, setErrors],
  );

  /* ── Soumission par étape ── */

  /** Étape 1 → valide les infos générales et passe à l'étape 2. */
  const submitStep1 = useCallback(
    (data: RecipeInfoDto) => {
      const result = recipeInfoSchema.safeParse(data);

      if (!result.success) {
        setErrors(zodErrorsToRecord(result.error));
        return;
      }

      setDraft((prev) => ({ ...prev, ...result.data }));
      setErrors({});
      setStep(2);
    },
    [setErrors],
  );

  /** Étape 2 → valide les ingrédients et passe à l'étape 3. */
  const submitStep2 = useCallback(
    (data: RecipeIngredientsDto) => {
      const result = recipeIngredientsSchema.safeParse(data);

      if (!result.success) {
        setErrors(zodErrorsToRecord(result.error));
        return;
      }

      setDraft((prev) => ({ ...prev, ...result.data }));
      setErrors({});
      setStep(3);
    },
    [setErrors],
  );

  /** Étape 3 → valide les étapes et soumet la recette complète. */
  const submitStep3 = useCallback(
    async (data: RecipeStepsDto) => {
      const result = recipeStepsSchema.safeParse(data);

      if (!result.success) {
        setErrors(zodErrorsToRecord(result.error));
        return;
      }

      const finalDraft = { ...draft, ...result.data } as CreateRecipeDto;

      setStatus("loading");
      setErrors({});

      try {
        await recipeService.createRecipe(finalDraft);
        console.log("c'est bon");
        setStatus("success");
      } catch (err) {
        const message = err instanceof Error ? err.message : "";
        setErrors({ form: [message || "Une erreur est survenue."] });
        setStatus("error");
      }
    },
    [draft, setErrors],
  );

  return {
    step,
    draft,
    status,
    errors,
    errorMessages,
    clearFieldError,
    loading: status === "loading",
    success: status === "success",
    goBack,
    submitStep1,
    submitStep2,
    submitStep3,
    goToStep
  };
}
