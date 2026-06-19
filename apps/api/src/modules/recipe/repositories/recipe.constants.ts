export const RECIPE_FULL_INCLUDE = {
  user: { select: { id: true, userName: true } },
  steps: { orderBy: { position: "asc" as const } },
  ingredients: { include: { ingredient: true } },
} as const;

export const RECIPE_SUMMARY_INCLUDE = {
  user: { select: { id: true, userName: true } },
} as const;