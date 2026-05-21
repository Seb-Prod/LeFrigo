"use client";

import { useAuth } from "@/contexts/auth.context";
import { mealPlanService } from "@/features/meal-plans/services/meal-plan.service";
import { MealPlan } from "@shared/types";
import { startTransition, useCallback, useEffect, useState } from "react";

export function useMealPlans() {
  const { token } = useAuth();

  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    startTransition(() => setLoading(true));
    mealPlanService.getAll(token).then((data) => {
      if (!cancelled) {
        setMealPlans(data);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const fetchMealPlans = useCallback(async () => {
    if (!token) return;
    const data = await mealPlanService.getAll(token);
    setMealPlans(data);
  }, [token]);

  const createMealPlan = async (
    date: string,
    mealType: "LUNCH" | "DINNER",
    recipeId: string,
  ) => {
    if (!token) return;
    try {
      const mealPlan = await mealPlanService.create(
        { date, mealType, recipeId },
        token,
      );
      setMealPlans((current) => [mealPlan, ...current]);
    } catch (error) {
      console.error("erreur création planing:", error);
      throw error;
    }
  };

  return {
    mealPlans,
    loading,
    createMealPlan,
    refresh: fetchMealPlans,
  };
}
