import { Card } from "@/components/ui";
import { Recipe } from "@shared/types/recipe.types";

type Props = {
  recipe: Recipe;
  onDelete: (id: string) => void;
};

export default function RecipeCard({ recipe, onDelete }: Props) {
  return (
    <Card>
      <h3>{recipe.name}</h3>
      <button onClick={() => onDelete(recipe.id)}>Supprimer</button>
    </Card>
  );
}
