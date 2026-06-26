import { PrismaClient, RecipeStatus } from "@prisma/client";

const prisma = new PrismaClient();

// ── CONFIG ────────────────────────────────────────────────────

/** Fenêtre temporelle des recettes (jours dans le passé) */
const DATE_RANGE_DAYS = 180;

/** Nombre de recettes par user */
const RECIPES_PER_USER = 20;

// ── DATA ──────────────────────────────────────────────────────

const adjectives = [
  "croustillant", "fondant", "épicé", "doux", "fumé", "grillé",
  "mijoté", "caramélisé", "frais", "léger", "généreux", "rustique",
];

const proteins = [
  "poulet", "saumon", "bœuf", "tofu", "crevettes", "agneau",
  "thon", "lentilles", "œufs", "canard", "porc", "pois chiches",
];

const bases = [
  "aux herbes", "à la tomate", "au citron", "au curry", "à l'ail",
  "au vin blanc", "aux champignons", "façon asiatique", "à la crème",
  "au paprika", "aux épices douces", "façon méditerranéenne",
];

const ingredients = [
  "oignon", "ail", "tomate", "carotte", "courgette", "poivron",
  "pomme de terre", "aubergine", "champignon", "citron", "persil",
  "thym", "cumin", "paprika", "gingembre", "basilic", "coriandre",
  "crème fraîche", "parmesan", "huile d'olive",
];

const units = ["g", "kg", "ml", "L", "tbsp", "tsp", null, null]; // null = sans unité

// ── HELPERS ───────────────────────────────────────────────────

/** Entier aléatoire entre min et max inclus */
const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Élément aléatoire d'un tableau */
const pick = <T>(arr: T[]): T => arr[randInt(0, arr.length - 1)];

/** Sous-ensemble aléatoire sans doublon */
function pickN<T>(arr: T[], n: number): T[] {
  const copy = [...arr].sort(() => Math.random() - 0.5);
  return copy.slice(0, n);
}

/** Date aléatoire dans les DATE_RANGE_DAYS derniers jours */
function randomPastDate(): Date {
  const now = Date.now();
  const offset = randInt(0, DATE_RANGE_DAYS * 24 * 60 * 60 * 1000);
  return new Date(now - offset);
}

/** Génère un nom de recette aléatoire */
function recipeName(): string {
  return `${pick(proteins)} ${pick(adjectives)} ${pick(bases)}`;
}

/** Génère une description courte */
function recipeDescription(name: string): string {
  return `Un délicieux ${name.toLowerCase()} préparé avec soin, idéal pour un repas en semaine ou le week-end.`;
}

/** Génère N étapes génériques */
function generateSteps(n: number): string[] {
  const pool = [
    "Préparer et découper tous les ingrédients.",
    "Faire chauffer l'huile dans une poêle à feu moyen.",
    "Faire revenir les aromates jusqu'à légère coloration.",
    "Ajouter les ingrédients principaux et mélanger.",
    "Assaisonner avec sel, poivre et épices au goût.",
    "Laisser mijoter à feu doux en couvrant partiellement.",
    "Vérifier la cuisson et ajuster l'assaisonnement.",
    "Dresser dans un plat chaud et décorer avec les herbes fraîches.",
    "Servir immédiatement accompagné du reste de votre choix.",
    "Laisser reposer 5 minutes avant de servir.",
  ];
  return pickN(pool, Math.min(n, pool.length));
}

// ── MAIN ──────────────────────────────────────────────────────

async function main() {
  const users = await prisma.user.findMany({ select: { id: true, userName: true } });

  if (users.length === 0) {
    throw new Error("Aucun utilisateur en base. Lance seed-users.ts d'abord.");
  }

  console.log(`\n🍽️   Seed recettes pour ${users.length} utilisateurs\n`);

  let total = 0;

  for (const user of users) {
    for (let i = 0; i < RECIPES_PER_USER; i++) {
      const name = recipeName();
      const createdAt = randomPastDate();

      // Ingrédients aléatoires (3 à 6)
      const recipeIngredients = pickN(ingredients, randInt(3, 6)).map((ing) => ({
        name: ing,
        quantity: Math.random() > 0.2 ? randInt(1, 500) : null,
        unit: pick(units),
      }));

      // Étapes aléatoires (3 à 5)
      const steps = generateSteps(randInt(3, 5));

      // Statut aléatoire pondéré (majorité PUBLISHED)
      const status = pick([
        RecipeStatus.PUBLISHED,
        RecipeStatus.PUBLISHED,
        RecipeStatus.PUBLISHED,
        RecipeStatus.PENDING,
        RecipeStatus.REJECTED,
      ]);

      const recipe = await prisma.recipe.create({
        data: {
          name,
          description: recipeDescription(name),
          preparationTime: randInt(5, 30),
          cookingTime: randInt(10, 90),
          servings: randInt(2, 8),
          status,
          userId: user.id,
          createdAt,
          updatedAt: createdAt,
          steps: {
            create: steps.map((instruction, index) => ({
              position: index + 1,
              instruction,
            })),
          },
        },
      });

      // Upsert + lier les ingrédients
      for (const ing of recipeIngredients) {
        const ingredient = await prisma.ingredient.upsert({
          where: { name: ing.name },
          update: {},
          create: { name: ing.name, createdAt, updatedAt: createdAt },
        });

        await prisma.recipeIngredient.upsert({
          where: {
            recipeId_ingredientId: {
              recipeId: recipe.id,
              ingredientId: ingredient.id,
            },
          },
          update: {},
          create: {
            recipeId: recipe.id,
            ingredientId: ingredient.id,
            quantity: ing.quantity,
            unit: ing.unit,
          },
        });
      }

      total++;
    }

    console.log(`  ✅  ${user.userName.padEnd(12)} — ${RECIPES_PER_USER} recettes`);
  }

  console.log(`\n🎉  ${total} recettes créées sur ${DATE_RANGE_DAYS} jours d'historique.\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());