import { RecipePage } from "@/features/recipes/pages/RecipePage";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecipePageRoute({ params }: Props) {
  const { id } = await params;
  return <RecipePage recipeId={id} />;
}
