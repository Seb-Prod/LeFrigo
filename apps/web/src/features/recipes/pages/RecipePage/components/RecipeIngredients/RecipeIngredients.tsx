"use client";

import { RecipeIngredientItem } from "@lefrigo/shared";
import { useState } from "react";
import styles from "./RecipeIngredients.module.css";
import { InputNumber, Heading } from "@/components/ui";

type Props = {
  ingredients: RecipeIngredientItem[];
  servings: number | null;
};

/**
 * Liste des ingrédients d'une recette avec ajustement des portions.
 *
 * Affiche les ingrédients sous forme de pills en grille. Les quantités
 * sont recalculées en temps réel par règle de trois dès que l'utilisateur
 * modifie le nombre de portions via `InputNumber`.
 *
 * @remarks
 * `servings` sert de référence de base (dénominateur) — il est capturé
 * une seule fois à l'initialisation via `useState`. Le state local
 * `currentServings` pilote le numérateur du ratio.
 *
 * @example
 * <RecipeIngredients ingredients={recipe.ingredients} servings={4} />
 */
export function RecipeIngredients({ ingredients, servings }: Props) {
  /* ── Portions ── */

  /** Référence immuable : portions pour lesquelles les quantités sont définies */
  const baseServings = servings ?? 1;

  /** Portions courantes, pilotées par l'InputNumber */
  const [currentServings, setCurrentServings] = useState<number>(baseServings);

  /* ── Helpers ── */

  /** Applique la règle de trois sur une quantité brute */
  const scale = (qty: number | null): string => {
    if (qty == null) return "";
    const scaled = (qty * currentServings) / baseServings;
    /** Arrondi à 2 décimales, supprime les zéros inutiles */
    return parseFloat(scaled.toFixed(2)).toString();
  };

  return (
    <div>
      {/* ── En-tête ── */}
      <div className={styles.header}>
        <Heading>Ingrédients</Heading>
        <InputNumber
          placeholder="Portions"
          value={currentServings}
          onChange={(v) => setCurrentServings(v ?? baseServings)}
          min={1}
          step={1}
        />
      </div>

      {/* ── Grille de pills ── */}
      <ul className={styles.ingredientList}>
        {ingredients.map((ing) => (
          <li key={ing.id} className={styles.ingredientItem}>
            {/* ── Nom ── */}
            <span className={styles.ingredientName}>{ing.name}</span>

            {/* ── Quantité + unité (masquées si absentes) ── */}
            {(ing.quantity != null || ing.unit) && (
              <span className={styles.ingredientQty}>
                {scale(ing.quantity)}
                {ing.unit ? ` ${ing.unit}` : ""}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}