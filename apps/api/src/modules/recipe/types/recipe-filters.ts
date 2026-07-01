export interface RecipeFilters {
  page: number;
  limit: number;

  search?: string;

  sort?:
    | "name"
    | "createdAt"
    | "preparationTime"
    | "cookingTime"
    | "totalTime";

  order?: "asc" | "desc";

  maxPreparationTime?: number | undefined;
  maxCookingTime?: number | undefined;
  maxRestTime?: number | undefined;
  maxTotalTime?: number | undefined;

//   difficulty?: "EASY" | "MEDIUM" | "HARD";

  status?: "PUBLISHED" | "PENDING" | "REJECTED";

//   onlyFavorites?: boolean;
}
