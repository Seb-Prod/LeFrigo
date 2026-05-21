import { Button, Card } from "@/components/ui";
import { Recipe } from "@shared/types/recipe.types";

import styles from "./RecipeCard.module.css";

type Props = {
  recipe: Recipe;
  onDelete: (id: string) => void;
};

export function RecipeCard({
  recipe,
  onDelete,
}: Props) {
  return (
    <Card>
      <div className={styles.content}>
        <h3>{recipe.name}</h3>

        <Button
          variant="danger"
          onClick={() => onDelete(recipe.id)}
        >
          Supprimer
        </Button>
      </div>
    </Card>
  );
}