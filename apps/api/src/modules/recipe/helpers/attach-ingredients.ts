import { Prisma } from "@prisma/client";
import { CreateRecipeDto } from "@lefrigo/shared";
import { ingredientRepository } from '../repositories/ingredient.repository';

export async function attachIngredients(
  tx: Prisma.TransactionClient,
  recipeId: string,
  ingredients: CreateRecipeDto["ingredients"]
) {
  for (const item of ingredients) {
    const ingredient = await ingredientRepository.findOrCreate(
      tx,
      item.name
    );

    await tx.recipeIngredient.create({
      data: {
        recipeId,
        ingredientId: ingredient.id,
        quantity: item.quantity,
        unit: item.unit,
      },
    });
  }
}