"use client"

import { Surface } from "@/components/ui";
import { useQuickPrepRecipes } from "../../hooks";
import { RecipeGrid } from "../../components/RecipeGrid";

export function QuickPrepPage(){
    const { recipes, loading, error } = useQuickPrepRecipes(10,10);
    return(
        <Surface titleSize="sm" subtitle="Préparation" fullScreen>
            <RecipeGrid recipes={recipes} isLoading={loading} hasError={error}/>
        </Surface>
    )
}