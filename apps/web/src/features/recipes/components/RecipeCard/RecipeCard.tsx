import { Button, Card } from "@/components/ui";
import { Recipe } from "@shared/types/recipe.types";

import styles from "./RecipeCard.module.css";

type Props = {
  recipe: Recipe;
  onDelete: (id: string) => void;
};

export function RecipeCard({ recipe, onDelete }: Props) {
  const handleDelete = () => {
    const confirmed = window.confirm("Supprimer cette recette ?");

    if (!confirmed) return;

    onDelete(recipe.id);
  };

  return (
    <Card>
      <div className={styles.content}>
        <h3>{recipe.name}</h3>

        <Button variant="danger" onClick={handleDelete}>
          Supprimer
        </Button>
      </div>
    </Card>
  );
}
