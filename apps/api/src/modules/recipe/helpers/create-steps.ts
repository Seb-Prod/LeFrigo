import { Prisma } from "@prisma/client";
import { CreateRecipeDto } from "@lefrigo/shared";

export async function createSteps(
  tx: Prisma.TransactionClient,
  recipeId: string,
  steps: CreateRecipeDto["steps"]
) {
  await tx.recipeStep.createMany({
    data: steps.map((step) => ({
      recipeId,
      position: step.position,
      instruction: step.instruction,
    })),
  });
}