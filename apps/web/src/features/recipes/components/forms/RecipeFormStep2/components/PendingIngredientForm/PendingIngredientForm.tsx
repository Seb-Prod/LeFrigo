"use client";

import { Button, Input, InputNumber } from "@/components/ui";
import styles from "./PendingIngredientForm.module.css";

/* ── Types ─────────────────────────────────────────────────── */

/**
 * État du mini-formulaire de confirmation d'un ingrédient.
 * Partagé avec RecipeFormStep2 — à centraliser dans un fichier types si besoin.
 */
export type PendingIngredient = {
  name: string;
  quantity: number | undefined;
  unit: string;
};

type Props = {
  /** Ingrédient en cours de saisie (nom pré-rempli depuis l'autocomplete) */
  ingredient: PendingIngredient;
  /** Patch partiel appliqué à l'ingrédient courant */
  onChange: (patch: Partial<PendingIngredient>) => void;
  /** Valide et ajoute/met à jour l'ingrédient dans la liste parente */
  onConfirm: () => void;
  /** Annule la saisie et ferme le mini-formulaire */
  onCancel: () => void;
};

/**
 * Mini-formulaire contextuel affiché après la sélection d'un ingrédient.
 *
 * États visuels :
 * - Toujours monté avec un `name` pré-rempli (non modifiable ici)
 * - `quantity` optionnelle — laissée vide si l'utilisateur ne renseigne rien
 * - `unit` optionnelle — texte libre (g, ml, pièce…)
 *
 * Utilisé en mode création (editingIndex === null) et en mode édition
 * (editingIndex !== null) depuis RecipeFormStep2. La distinction est gérée
 * par le parent ; ce composant est stateless côté logique métier.
 */
export function PendingIngredientForm({
  ingredient,
  onChange,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className={styles.miniForm}>
      {/* ── Nom sélectionné (lecture seule) ── */}
      <p className={styles.pendingName}>{ingredient.name}</p>

      {/* ── Quantité + unité ── */}
      <div className={styles.miniRow}>
        <InputNumber
          placeholder="Quantité"
          value={ingredient.quantity}
          min={0}
          onChange={(value) => onChange({ quantity: value })}
        />
        <Input
          placeholder="Unité (g, ml, pièce…)"
          value={ingredient.unit}
          onChange={(e) => onChange({ unit: e.target.value })}
        />
      </div>

      {/* ── Actions ── */}
      <div className={styles.miniActions}>
        <Button type="button"  variant="ghost" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="button"  onClick={onConfirm}>
          Confirmer
        </Button>
      </div>
    </div>
  );
}