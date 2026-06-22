"use client";

import { RecipeIngredientDto } from "@lefrigo/shared";
import { IngredientActions } from "../IngredientActions";
import styles from "./IngredientList.module.css";
import { Badge, Text } from "@/components/ui";

/* ── Types ─────────────────────────────────────────────────── */

type Props = {
  ingredients: RecipeIngredientDto[];
  /** Index de l'item en cours d'édition — met en évidence le li correspondant */
  editingIndex: number | null;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  disabled: boolean;
};

/**
 * Liste des ingrédients confirmés d'une recette en cours de création.
 *
 * États visuels :
 * - Item normal     : fond neutre, actions visibles au hover
 * - Item en édition : classe `itemEditing` appliquée (highlight visuel)
 *
 * Chaque item affiche : nom · quantité optionnelle · unité optionnelle · actions.
 * Le composant est purement présentationnel — toute la logique métier
 * (ajout, édition, suppression) reste dans RecipeFormStep2.
 */
export function IngredientList({
  ingredients,
  editingIndex,
  onEdit,
  onRemove,
  disabled,
}: Props) {
  if (ingredients.length === 0) return null;

  return (
    <div className={styles.scrollContainer}>
      <ul className={styles.list}>
        {[...ingredients].reverse().map((ingredient, reversedIndex) => {
          const index = ingredients.length - 1 - reversedIndex;
          return (
            <li
              key={index}
              className={[
                styles.item,
                editingIndex === index && styles.itemEditing,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* ── Nom + méta ── */}
              <Text size="lg" className={styles.name}>
                {ingredient.name}
              </Text>
              {ingredient.quantity && (
                <Badge color="neutral">
                  {ingredient.quantity}
                  {ingredient.unit ? ` ${ingredient.unit}` : ""}
                </Badge>
              )}

              {/* ── Actions ── */}
              <IngredientActions
                name={ingredient.name}
                onEdit={() => onEdit(index)}
                onRemove={() => onRemove(index)}
                disabled={disabled}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
