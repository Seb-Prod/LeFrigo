"use client";

import { useEffect, useState } from "react";
import { recipeService } from "@/features/recipes/services/recipe.service";
import type { SafeRecipe } from "@lefrigo/shared";

/* ── Types ─────────────────────────────────────────────────── */

type State =
  | { status: "loading" }
  | { status: "success"; recipe: SafeRecipe }
  | { status: "error"; message: string };

/* ── Hook ───────────────────────────────────────────────────── */

export function useRecipe(id: string): State {
  const [state, setState] = useState<State>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    recipeService
      .getById(id)
      .then((recipe) => {
        if (!cancelled) {
          setState({
            status: "success",
            recipe,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({
            status: "error",
            message: "Recette introuvable.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}