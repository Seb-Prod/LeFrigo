import { Divider, Surface } from "@/components/ui";
import {
  DiscoverSection,
  IngredientSearchSection,
  LatestRecipesSection,
  QuickMealSection,
  QuickPrepSection,
  RecipesTopbar,
} from "./components";

export function RecipesPage() {
  return (
    <Surface fullScreen>
      <RecipesTopbar />
      <QuickPrepSection />
      <Divider/>
      <QuickMealSection />
      <IngredientSearchSection />
      <DiscoverSection />
      <LatestRecipesSection />
    </Surface>
  );
}
