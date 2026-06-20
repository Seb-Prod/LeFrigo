import { FormCard, Input, InputNumber, TextArea } from "@/components/ui";
import { TbChefHat } from "react-icons/tb";
import {
  recipeInfoSchema,
  RecipeInfoDto,
  zodErrorsToRecord,
} from "@lefrigo/shared";
import { useState } from "react";
import { useFormErrors } from "@/hooks";
import styles from "./RecipeFormStep1.module.css";
import { FaAlignLeft, FaUtensils } from "react-icons/fa";

type Props = {
  defaultValues: Partial<RecipeInfoDto>;
  onSubmit: (data: RecipeInfoDto) => void;
};

/**
 * Étape 1 du formulaire de création de recette.
 *
 * Champs : nom, description, temps de préparation, temps de cuisson, portions.
 * Valide via `recipeInfoSchema` avant d'appeler `onSubmit`.
 */
export function RecipeFormStep1({ defaultValues, onSubmit }: Props) {
  const [fields, setFields] = useState<RecipeInfoDto>({
    name: defaultValues.name ?? "",
    description: defaultValues.description ?? "",
    preparationTime: defaultValues.preparationTime ?? undefined,
    cookingTime: defaultValues.cookingTime ?? undefined,
    servings: defaultValues.servings ?? undefined,
  });

  const { errors, setErrors, clearFieldError, errorMessages } = useFormErrors();

  /* ── Helpers ── */

  const setField =
    <K extends keyof RecipeInfoDto>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const raw = e.target.value;
      const value =
        e.target.type === "number"
          ? raw === ""
            ? undefined
            : Number(raw)
          : raw;
      setFields((prev) => ({ ...prev, [key]: value }));
      clearFieldError(key);
    };

  const setNumberField =
    <K extends keyof RecipeInfoDto>(key: K) =>
    (value: number | undefined) => {
      setFields((prev) => ({
        ...prev,

        [key]: value,
      }));

      clearFieldError(key);
    };

  /* ── Submit ── */

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const result = recipeInfoSchema.safeParse(fields);

    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error));
      return;
    }

    onSubmit(result.data);
  };

  return (
    <FormCard
      icon={<TbChefHat />}
      title="Informations générales"
      description="Donnez un nom et décrivez votre recette."
      buttonLabel="Suivant"
      onSubmit={handleSubmit}
      errorMessages={errorMessages}
    >
      {/* ── Nom ── */}
      <Input
        iconLeft={<FaUtensils />}
        placeholder="Nom de la recette"
        required
        value={fields.name}
        error={!!errors.name}
        onChange={setField("name")}
      />

      {/* ── Description ── */}
      <TextArea
        iconLeft={<FaAlignLeft />}
        placeholder="Description (optionnel)"
        value={fields.description ?? ""}
        error={!!errors.description}
        onChange={setField("description")}
      />

      {/* ── Temps ── */}
      <div className={styles.row}>
        <InputNumber
          placeholder="Temps de préparation (min)"
          value={fields.preparationTime ?? 0}
          min={0}
          step={5}
          onChange={setNumberField("preparationTime")}
        />

        <InputNumber
          placeholder="Temps de cuisson (min)"
          value={fields.cookingTime ?? 0}
          min={0}
          step={5}
          onChange={setNumberField("cookingTime")}
        />
      </div>

      {/* ── Portions ── */}
      <InputNumber
        placeholder="Nombre de portions"
        value={fields.servings ?? 0}
        onChange={setNumberField("servings")}
      />
    </FormCard>
  );
}
