"use client";

import { useRecipes } from "@/features/recipes";
import { SyntheticEvent, useState } from "react";
import { Button, Input, Select } from "@/components/ui";

type Props = {
  onSubmit: (
    date: string,
    mealType: "LUNCH" | "DINNER",
    recipeId: string,
  ) => Promise<void>;
};

export function MealPlanForm({ onSubmit }: Props) {
  const { recipes } = useRecipes();

  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState<"LUNCH" | "DINNER">("LUNCH");

  const [recipeId, setRecipeId] = useState("");

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!recipeId || !date ) return;

    await onSubmit(date, mealType, recipeId);

    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
      <Select
        value={mealType}
        onChange={(e) => setMealType(e.target.value as "LUNCH" | "DINNER")}
      >
        <option value="LUNCH">Midi</option>

        <option value="DINNER">Soir</option>
      </Select>

      <br />

      <Select value={recipeId} onChange={(e) => setRecipeId(e.target.value)}>
        <option value="">Choisir une recette</option>

        {recipes.map((recipe) => (
          <option key={recipe.id} value={recipe.id}>
            {recipe.name}
          </option>
        ))}
      </Select>

      <br />

      <Button type="submit">Ajouter</Button>
    </form>
  );
}
