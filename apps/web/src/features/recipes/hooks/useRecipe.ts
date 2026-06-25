"use client";

import { useEffect, useState } from "react";
import { recipeService } from "@/features/recipes/services/recipe.service";
import type { SafeRecipe } from "@lefrigo/shared";

/* ── Types ─────────────────────────────────────────────────── */

type State =
  | { status: "loading"; id: string }
  | { status: "success"; id: string; recipe: SafeRecipe }
  | { status: "error"; id: string; message: string };

/** États de forçage disponibles en développement uniquement */
type DevState = "normal" | "loading" | "error";

/* ── Constantes de développement ────────────────────────────── */

/** Changer cette valeur pour simuler un état particulier en dev */
const DEV_STATE: DevState = "normal";

/** Délai artificiel en ms avant de retourner le résultat réel (0 = désactivé) */
const DEV_DELAY_MS = 200;

/* ── Hook ───────────────────────────────────────────────────── */

/**
 * Charge une recette complète par son identifiant via `recipeService.getById`.
 *
 * États retournés :
 * - `loading` → fetch en cours, ou transition vers un nouvel `id`
 * - `success` → recette disponible dans `state.recipe`
 * - `error`   → message d'erreur dans `state.message`
 *
 * Comportements :
 * - Si `id` change avant la résolution, l'effet précédent est annulé
 *   (flag `cancelled`) et `loading` est retourné immédiatement.
 * - En développement, `DEV_STATE` permet de forcer un état visuel
 *   sans modifier la logique de fetch.
 * - En développement, `DEV_DELAY_MS` ajoute un délai artificiel
 *   pour tester les skeletons et états de chargement.
 */
export function useRecipe(id: string): State {
  /* ── État interne ────────────────────────────────────────── */

  const [state, setState] = useState<State>({ status: "loading", id });

  /* ── Chargement ──────────────────────────────────────────── */

  useEffect(() => {
    /** Empêche les setState après démontage ou changement d'id */
    let cancelled = false;

    async function loadRecipe() {
      try {
        const recipe = await recipeService.getById(id);

        /* Délai artificiel en dev pour tester les skeletons */
        if (process.env.NODE_ENV === "development" && DEV_DELAY_MS > 0) {
          await new Promise((resolve) => setTimeout(resolve, DEV_DELAY_MS));
        }

        if (cancelled) return;
        setState({ status: "success", id, recipe });
      } catch {
        if (cancelled) return;
        setState({ status: "error", id, message: "Recette introuvable." });
      }
    }

    loadRecipe();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* ── Forçage d'état (développement uniquement) ───────────── */

  if (process.env.NODE_ENV === "development") {
    switch (DEV_STATE) {
      case "loading":
        return { status: "loading", id };
      case "error":
        return { status: "error", id, message: "Erreur simulée" };
      default:
        break;
    }
  }

  /* ── Transition optimiste : id demandé ≠ id chargé ──────── */

  /** Retourne `loading` immédiatement si l'id a changé mais le state ne reflète pas encore le nouvel id */
  if (state.id !== id) {
    return { status: "loading", id };
  }

  return state;
}