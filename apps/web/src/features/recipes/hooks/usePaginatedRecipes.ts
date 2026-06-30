import { useEffect, useState } from "react";
import { PaginatedRecipes } from "../services/recipe.service";

/* ── Types ─────────────────────────────────────────────────── */

type Status = "idle" | "loading" | "success" | "error";

type UsePaginatedRecipesOptions = {
  fetcher: () => Promise<PaginatedRecipes>;
  deps?: unknown[];
};

export function usePaginatedRecipes({ fetcher, deps = [] }: UsePaginatedRecipesOptions) {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<PaginatedRecipes | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setStatus("loading");
      try {
        const result = await fetcher();
        if (!cancelled) {
          setData(result);
          setStatus("success");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    recipes: data?.recipes ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? 1,
    loading: status === "loading",
    error: status === "error",
  };
}