import { RecipesCatalogPage } from "@/features/recipes/pages/RecipesCatalogPage";
import { RecipesHomePage } from "@/features/recipes/pages/RecipesHomePage";
import type { RecipeFilters } from "@lefrigo/shared";

type SearchParams = {
  view?: string;
  search?: string;
  sort?: string;
  order?: string;
  maxPreparationTime?: string;
  maxCookingTime?: string;
  maxTotalTime?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

/**
 * Convertit les search params d'URL (toujours des strings) vers
 * `RecipeFilters` (types numériques attendus par l'API).
 */
function parseFiltersFromParams(params: SearchParams): RecipeFilters {
  return {
    search: params.search,
    sort: params.sort as RecipeFilters["sort"],
    order: params.order as RecipeFilters["order"],
    maxPreparationTime: params.maxPreparationTime
      ? Number(params.maxPreparationTime)
      : undefined,
    maxCookingTime: params.maxCookingTime
      ? Number(params.maxCookingTime)
      : undefined,
    maxTotalTime: params.maxTotalTime ? Number(params.maxTotalTime) : undefined,
  };
}

export default async function RecipesPageRoute({ searchParams }: PageProps) {
  const params = await searchParams;

  if (params.view === "catalog") {
    return (
      <RecipesCatalogPage initialFilters={parseFiltersFromParams(params)} />
    );
  }

  return <RecipesHomePage />;
}
