import { Text } from "@/components/ui";

type Props = {
  description: string | null;
};

/**
 * Affiche la description libre d'une recette.
 *
 * Composant intentionnellement minimal : délègue tout le rendu
 * typographique à `Text`. La valeur `null` est passée telle quelle —
 * `Text` est responsable de la gestion du contenu vide.
 *
 * @example
 * <RecipeDescription description="Une quiche lorraine crémeuse et dorée." />
 */
export function RecipeDescription({ description }: Props) {
  return <Text align="justify">{description}</Text>;
}