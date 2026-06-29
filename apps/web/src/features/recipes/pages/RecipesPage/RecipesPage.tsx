import { Surface } from "@/components/ui";
import {
  DiscoverSection,
  IngredientSearchSection,
  QuickMealSection,
  QuickPrepSection,
  RecipesTopbar,
} from "./components";

export function RecipesPage() {
  return (
    <Surface fullScreen>
      <RecipesTopbar isSkeleton />
      <QuickPrepSection />
      <QuickMealSection />
      <IngredientSearchSection />
      <DiscoverSection />
    </Surface>
  );
}
