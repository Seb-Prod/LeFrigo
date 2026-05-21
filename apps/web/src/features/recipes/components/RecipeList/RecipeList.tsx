import { RecipeCard } from "@/features/recipes";
import type { Recipe } from "@shared/types/recipe.types";
import styles from "./RecipeList.module.css";

type Props = {
  recipes: Recipe[];
  onDelete: (id: string) => void;
};

export function RecipeList({ recipes, onDelete }: Props) {
  if (recipes.length === 0) {
    return <p>Aucune recette.</p>;
  }

  return (
    <div className={styles.list}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onDelete={onDelete} />
      ))}
    </div>
  );
}
