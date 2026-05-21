"use client";

import { useMealPlans } from "@/features/meal-plans";

export default function PlanningPage() {
  const { mealPlans } = useMealPlans();

  return (
    <>
      <h1>Planning</h1>

      {mealPlans.map((mealPlan) => (
        <div key={mealPlan.id}>
          <strong>{mealPlan.recipe.name}</strong>

          {" - "}

          {mealPlan.mealType}

          {" - "}

          {mealPlan.date}
        </div>
      ))}
    </>
  );
}
