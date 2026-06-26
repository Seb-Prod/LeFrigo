import { PrismaClient, RecipeStatus } from "@prisma/client";

const prisma = new PrismaClient();

// ── DATA ───────────────────────────────────────────────────────

const USER_EMAIL = "lefrigo.admin@gmail.com";

const recipes = [
  {
    name: "Poulet rôti aux herbes",
    description:
      "Un classique incontournable : poulet entier rôti au four avec herbes de Provence, ail et citron.",
    preparationTime: 15,
    cookingTime: 80,
    servings: 4,
    ingredients: [
      { name: "poulet entier", quantity: 1, unit: null },
      { name: "ail", quantity: 4, unit: null },
      { name: "citron", quantity: 1, unit: null },
      { name: "herbes de Provence", quantity: 2, unit: "tbsp" },
      { name: "huile d'olive", quantity: 3, unit: "tbsp" },
      { name: "sel", quantity: null, unit: null },
      { name: "poivre", quantity: null, unit: null },
    ],
    steps: [
      "Préchauffer le four à 200°C.",
      "Frotter le poulet avec l'huile d'olive, l'ail écrasé, les herbes, le sel et le poivre.",
      "Glisser le citron coupé en deux à l'intérieur de la carcasse.",
      "Enfourner 1h20 en arrosant toutes les 20 minutes avec le jus de cuisson.",
      "Laisser reposer 10 minutes avant de découper.",
    ],
  },
  {
    name: "Ratatouille provençale",
    description:
      "Légumes du soleil mijotés lentement à l'huile d'olive, parfumés au basilic frais.",
    preparationTime: 20,
    cookingTime: 45,
    servings: 6,
    ingredients: [
      { name: "aubergine", quantity: 2, unit: null },
      { name: "courgette", quantity: 2, unit: null },
      { name: "poivron rouge", quantity: 2, unit: null },
      { name: "tomate", quantity: 4, unit: null },
      { name: "oignon", quantity: 2, unit: null },
      { name: "ail", quantity: 3, unit: null },
      { name: "basilic frais", quantity: 1, unit: "bunch" },
      { name: "huile d'olive", quantity: 4, unit: "tbsp" },
    ],
    steps: [
      "Couper tous les légumes en dés de taille similaire.",
      "Faire revenir l'oignon et l'ail dans l'huile d'olive à feu moyen.",
      "Ajouter les poivrons et faire sauter 5 minutes.",
      "Incorporer les aubergines, courgettes et tomates.",
      "Saler, poivrer et laisser mijoter 40 minutes à feu doux.",
      "Ajouter le basilic ciselé hors du feu avant de servir.",
    ],
  },
  {
    name: "Quiche lorraine",
    description:
      "La quiche lorraine traditionnelle avec lardons fumés et crème fraîche épaisse, dans une pâte brisée maison.",
    preparationTime: 20,
    cookingTime: 35,
    servings: 6,
    ingredients: [
      { name: "pâte brisée", quantity: 1, unit: null },
      { name: "lardons fumés", quantity: 200, unit: "g" },
      { name: "œuf", quantity: 3, unit: null },
      { name: "crème fraîche épaisse", quantity: 200, unit: "ml" },
      { name: "lait entier", quantity: 100, unit: "ml" },
      { name: "gruyère râpé", quantity: 80, unit: "g" },
      { name: "noix de muscade", quantity: null, unit: null },
    ],
    steps: [
      "Préchauffer le four à 180°C. Foncer un moule à tarte avec la pâte brisée.",
      "Faire revenir les lardons à sec jusqu'à légère coloration, égoutter.",
      "Battre les œufs avec la crème, le lait, la muscade, sel et poivre.",
      "Répartir les lardons sur le fond de tarte, verser l'appareil.",
      "Parsemer de gruyère et enfourner 35 minutes jusqu'à belle dorure.",
    ],
  },
  {
    name: "Soupe à l'oignon gratinée",
    description:
      "Soupe à l'oignon caramélisée au vin blanc, gratinée au four avec des croûtons et du fromage fondant.",
    preparationTime: 15,
    cookingTime: 60,
    servings: 4,
    ingredients: [
      { name: "oignon", quantity: 6, unit: null },
      { name: "beurre", quantity: 40, unit: "g" },
      { name: "farine", quantity: 2, unit: "tbsp" },
      { name: "vin blanc sec", quantity: 150, unit: "ml" },
      { name: "bouillon de bœuf", quantity: 1, unit: "L" },
      { name: "pain de campagne", quantity: 4, unit: null },
      { name: "gruyère râpé", quantity: 150, unit: "g" },
      { name: "thym", quantity: 2, unit: "sprigs" },
    ],
    steps: [
      "Émincer finement les oignons. Les faire caraméliser dans le beurre 25 minutes à feu doux.",
      "Singer avec la farine, mélanger 2 minutes.",
      "Déglacer au vin blanc, laisser réduire 5 minutes.",
      "Verser le bouillon chaud et le thym. Mijoter 30 minutes.",
      "Répartir dans des bols allant au four, poser les tranches de pain.",
      "Couvrir généreusement de gruyère et gratiner 10 minutes sous le gril.",
    ],
  },
  {
    name: "Bœuf bourguignon",
    description:
      "Mijot de bœuf au vin rouge de Bourgogne, carottes, champignons et lardons — meilleur réchauffé le lendemain.",
    preparationTime: 30,
    cookingTime: 180,
    servings: 6,
    ingredients: [
      { name: "bœuf à braiser (paleron)", quantity: 1200, unit: "g" },
      { name: "vin rouge de Bourgogne", quantity: 750, unit: "ml" },
      { name: "lardons", quantity: 150, unit: "g" },
      { name: "carotte", quantity: 3, unit: null },
      { name: "champignon de Paris", quantity: 250, unit: "g" },
      { name: "oignon", quantity: 2, unit: null },
      { name: "ail", quantity: 3, unit: null },
      { name: "concentré de tomate", quantity: 1, unit: "tbsp" },
      { name: "bouquet garni", quantity: 1, unit: null },
      { name: "huile", quantity: 2, unit: "tbsp" },
    ],
    steps: [
      "Couper le bœuf en gros cubes, faire mariner 2h dans le vin avec aromates (optionnel).",
      "Saisir les cubes de bœuf à l'huile sur toutes les faces, réserver.",
      "Faire revenir les lardons, l'oignon et l'ail dans la même cocotte.",
      "Ajouter le concentré de tomate, déglacer avec le vin.",
      "Remettre le bœuf, ajouter le bouquet garni et les carottes en rondelles.",
      "Mijoter à couvert 2h30 à feu très doux. Ajouter les champignons 30 minutes avant la fin.",
    ],
  },
  {
    name: "Tarte tatin aux pommes",
    description:
      "La tarte renversée emblématique : pommes caramélisées au beurre recouvertes d'une pâte feuilletée croustillante.",
    preparationTime: 20,
    cookingTime: 40,
    servings: 6,
    ingredients: [
      { name: "pomme golden", quantity: 6, unit: null },
      { name: "pâte feuilletée", quantity: 1, unit: null },
      { name: "sucre", quantity: 120, unit: "g" },
      { name: "beurre", quantity: 60, unit: "g" },
      { name: "cannelle", quantity: 1, unit: "tsp" },
    ],
    steps: [
      "Préchauffer le four à 190°C. Éplucher et couper les pommes en quartiers.",
      "Dans un moule à tatin ou poêle allant au four, faire fondre beurre et sucre jusqu'à caramel ambré.",
      "Disposer les pommes tête-bêche dans le caramel. Saupoudrer de cannelle.",
      "Cuire 15 minutes à feu moyen pour compoter légèrement.",
      "Couvrir avec la pâte feuilletée en rentrant les bords.",
      "Enfourner 25 minutes. Laisser tiédir 5 minutes puis retourner sur un plat.",
    ],
  },
  {
    name: "Gratin dauphinois",
    description:
      "Pommes de terre fondantes cuites lentement dans la crème et l'ail, gratinées au four.",
    preparationTime: 20,
    cookingTime: 70,
    servings: 6,
    ingredients: [
      { name: "pomme de terre", quantity: 1200, unit: "g" },
      { name: "crème fraîche liquide entière", quantity: 400, unit: "ml" },
      { name: "lait entier", quantity: 200, unit: "ml" },
      { name: "ail", quantity: 2, unit: null },
      { name: "beurre", quantity: 20, unit: "g" },
      { name: "noix de muscade", quantity: null, unit: null },
      { name: "sel", quantity: null, unit: null },
    ],
    steps: [
      "Préchauffer le four à 160°C. Éplucher et trancher les pommes de terre finement à la mandoline.",
      "Frotter le plat à gratin avec l'ail puis le beurrer.",
      "Faire chauffer la crème et le lait avec l'ail écrasé, muscade, sel et poivre.",
      "Disposer les pommes de terre en couches, verser le mélange crème.",
      "Enfourner 70 minutes jusqu'à ce que les pommes de terre soient fondantes.",
    ],
  },
  {
    name: "Crème brûlée à la vanille",
    description:
      "La crème brûlée onctueuse classique, avec sa fine croûte de sucre caramélisé au chalumeau.",
    preparationTime: 15,
    cookingTime: 45,
    servings: 4,
    ingredients: [
      { name: "jaune d'œuf", quantity: 5, unit: null },
      { name: "crème fraîche liquide entière", quantity: 500, unit: "ml" },
      { name: "sucre", quantity: 80, unit: "g" },
      { name: "gousse de vanille", quantity: 1, unit: null },
      { name: "cassonade", quantity: 4, unit: "tbsp" },
    ],
    steps: [
      "Préchauffer le four à 150°C. Faire infuser la vanille dans la crème chaude 10 minutes.",
      "Battre les jaunes avec le sucre sans faire mousser.",
      "Verser la crème tiédie sur les jaunes en mélangeant délicatement.",
      "Filtrer et répartir dans des ramequins. Cuire au bain-marie 40-45 minutes.",
      "Réfrigérer au moins 2h. Saupoudrer de cassonade et caraméliser au chalumeau.",
    ],
  },
  {
    name: "Salade niçoise",
    description:
      "La salade niçoise authentique : thon, olives, anchois, œufs durs et légumes frais, sans cuisson.",
    preparationTime: 20,
    cookingTime: 10,
    servings: 4,
    ingredients: [
      { name: "thon en conserve", quantity: 240, unit: "g" },
      { name: "œuf", quantity: 4, unit: null },
      { name: "tomate cerise", quantity: 200, unit: "g" },
      { name: "haricot vert", quantity: 200, unit: "g" },
      { name: "olives niçoises", quantity: 80, unit: "g" },
      { name: "anchois à l'huile", quantity: 8, unit: null },
      { name: "oignon rouge", quantity: 1, unit: null },
      { name: "basilic frais", quantity: 1, unit: "bunch" },
      { name: "huile d'olive", quantity: 3, unit: "tbsp" },
      { name: "vinaigre de vin", quantity: 1, unit: "tbsp" },
    ],
    steps: [
      "Faire cuire les œufs durs 10 minutes, refroidir et écailler.",
      "Blanchir les haricots verts 5 minutes à l'eau bouillante salée, refroidir.",
      "Préparer la vinaigrette à l'huile d'olive et vinaigre, saler et poivrer.",
      "Dresser les ingrédients dans un grand plat sans mélanger.",
      "Arroser de vinaigrette et décorer de basilic frais.",
    ],
  },
  {
    name: "Moules marinières",
    description:
      "Moules fraîches cuites à la vapeur de vin blanc avec échalotes et persil — prêtes en 15 minutes.",
    preparationTime: 10,
    cookingTime: 10,
    servings: 4,
    ingredients: [
      { name: "moules fraîches", quantity: 2, unit: "kg" },
      { name: "vin blanc sec", quantity: 200, unit: "ml" },
      { name: "échalote", quantity: 3, unit: null },
      { name: "ail", quantity: 2, unit: null },
      { name: "beurre", quantity: 30, unit: "g" },
      { name: "persil plat", quantity: 1, unit: "bunch" },
    ],
    steps: [
      "Gratter et rincer les moules, éliminer celles ouvertes qui ne se ferment pas.",
      "Faire suer les échalotes et l'ail dans le beurre 2 minutes.",
      "Déglacer au vin blanc, porter à ébullition.",
      "Verser les moules, couvrir et cuire à feu vif 5 minutes en remuant.",
      "Retirer les moules non ouvertes. Parsemer de persil ciselé et servir immédiatement.",
    ],
  },
  {
    name: "Risotto aux champignons",
    description:
      "Risotto crémeux aux champignons sauvages, mantecato au parmesan et au beurre froid.",
    preparationTime: 15,
    cookingTime: 30,
    servings: 4,
    ingredients: [
      { name: "riz arborio", quantity: 320, unit: "g" },
      { name: "champignon de Paris", quantity: 300, unit: "g" },
      { name: "champignon séché (cèpes)", quantity: 30, unit: "g" },
      { name: "oignon", quantity: 1, unit: null },
      { name: "ail", quantity: 2, unit: null },
      { name: "vin blanc sec", quantity: 150, unit: "ml" },
      { name: "bouillon de légumes", quantity: 1.2, unit: "L" },
      { name: "parmesan râpé", quantity: 80, unit: "g" },
      { name: "beurre", quantity: 40, unit: "g" },
      { name: "huile d'olive", quantity: 2, unit: "tbsp" },
    ],
    steps: [
      "Réhydrater les champignons séchés 20 minutes dans de l'eau chaude, filtrer et conserver le jus.",
      "Faire sauter les champignons frais à l'huile avec l'ail. Réserver.",
      "Faire revenir l'oignon dans l'huile et la moitié du beurre.",
      "Ajouter le riz, nacrer 2 minutes. Déglacer au vin blanc.",
      "Ajouter le bouillon louche par louche en remuant constamment pendant 18 minutes.",
      "Incorporer champignons, parmesan et beurre restant hors du feu. Mantecare vigoureusement.",
    ],
  },
  {
    name: "Crêpes bretonnes",
    description:
      "Crêpes fines et dorées à la farine de blé, idéales sucrées ou salées selon la garniture.",
    preparationTime: 10,
    cookingTime: 20,
    servings: 4,
    ingredients: [
      { name: "farine", quantity: 250, unit: "g" },
      { name: "œuf", quantity: 3, unit: null },
      { name: "lait entier", quantity: 600, unit: "ml" },
      { name: "beurre fondu", quantity: 40, unit: "g" },
      { name: "sel", quantity: 1, unit: "pinch" },
      { name: "sucre vanillé", quantity: 1, unit: "tbsp" },
    ],
    steps: [
      "Mélanger farine, sel et sucre. Creuser un puits, y casser les œufs.",
      "Incorporer progressivement le lait en fouettant pour éviter les grumeaux.",
      "Ajouter le beurre fondu. Laisser reposer la pâte 30 minutes.",
      "Cuire à la crêpière bien chaude légèrement beurrée, 1 à 2 minutes par face.",
    ],
  },
  {
    name: "Tarte flambée (Flammekueche)",
    description:
      "La tarte flambée alsacienne sur fine pâte croustillante, crème fraîche, oignons et lardons.",
    preparationTime: 20,
    cookingTime: 12,
    servings: 4,
    ingredients: [
      { name: "farine", quantity: 300, unit: "g" },
      { name: "eau tiède", quantity: 150, unit: "ml" },
      { name: "huile", quantity: 2, unit: "tbsp" },
      { name: "crème fraîche épaisse", quantity: 200, unit: "g" },
      { name: "fromage blanc", quantity: 100, unit: "g" },
      { name: "oignon", quantity: 2, unit: null },
      { name: "lardons fumés", quantity: 150, unit: "g" },
    ],
    steps: [
      "Pétrir farine, eau, huile et une pincée de sel jusqu'à pâte lisse. Laisser reposer 30 minutes.",
      "Préchauffer le four à 250°C avec la plaque à l'intérieur.",
      "Étaler la pâte très finement (2 mm). Mélanger crème et fromage blanc, saler et poivrer.",
      "Étaler la crème sur la pâte, disposer les oignons émincés et les lardons.",
      "Cuire 10-12 minutes jusqu'à bords croustillants et légèrement brûlés.",
    ],
  },
  {
    name: "Poulet basquaise",
    description:
      "Poulet mijoté dans une sauce tomate aux poivrons et piment d'Espelette, typique du Pays Basque.",
    preparationTime: 20,
    cookingTime: 50,
    servings: 4,
    ingredients: [
      { name: "poulet découpé en morceaux", quantity: 1, unit: null },
      { name: "poivron rouge", quantity: 3, unit: null },
      { name: "poivron vert", quantity: 1, unit: null },
      { name: "tomate", quantity: 4, unit: null },
      { name: "oignon", quantity: 2, unit: null },
      { name: "ail", quantity: 3, unit: null },
      { name: "piment d'Espelette", quantity: 1, unit: "tsp" },
      { name: "concentré de tomate", quantity: 1, unit: "tbsp" },
      { name: "vin blanc", quantity: 100, unit: "ml" },
      { name: "huile d'olive", quantity: 3, unit: "tbsp" },
    ],
    steps: [
      "Faire dorer les morceaux de poulet dans l'huile sur toutes les faces. Réserver.",
      "Faire revenir oignons, ail et poivrons émincés 10 minutes dans la même cocotte.",
      "Ajouter les tomates pelées concassées, le concentré et le piment d'Espelette.",
      "Déglacer au vin blanc, remettre le poulet.",
      "Couvrir et mijoter 40 minutes à feu doux. Rectifier l'assaisonnement.",
    ],
  },
  {
    name: "Pain perdu façon brioche",
    description:
      "Tranches de brioche rassise trempées dans un appareil vanillé, dorées au beurre — petit-déjeuner ou dessert.",
    preparationTime: 10,
    cookingTime: 10,
    servings: 4,
    ingredients: [
      { name: "brioche rassise", quantity: 8, unit: null },
      { name: "œuf", quantity: 3, unit: null },
      { name: "lait entier", quantity: 200, unit: "ml" },
      { name: "sucre", quantity: 2, unit: "tbsp" },
      { name: "gousse de vanille", quantity: 1, unit: null },
      { name: "beurre", quantity: 30, unit: "g" },
    ],
    steps: [
      "Battre les œufs avec le lait, le sucre et les graines de vanille.",
      "Tremper les tranches de brioche dans l'appareil 1 minute de chaque côté.",
      "Faire chauffer le beurre à feu moyen dans une poêle.",
      "Cuire les tranches 2-3 minutes par face jusqu'à belle dorure.",
      "Servir chaud saupoudré de sucre glace ou avec un coulis de fruits rouges.",
    ],
  },
];

// ── HELPERS ───────────────────────────────────────────────────

/** Upsert un ingrédient par son nom (insensible à la casse) */
async function upsertIngredient(name: string) {
  return prisma.ingredient.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

// ── MAIN ──────────────────────────────────────────────────────

async function main() {
  // Récupération de l'utilisateur seed
  const user = await prisma.user.findUnique({
    where: { email: USER_EMAIL },
  });

  if (!user) {
    throw new Error(
      `Utilisateur "${USER_EMAIL}" introuvable. ` +
        `Modifie la constante USER_EMAIL en tête de fichier.`
    );
  }

  console.log(`\n🥕  Seed lancé pour ${user.userName} (${user.email})\n`);

  for (const data of recipes) {
    // Créer la recette
    const recipe = await prisma.recipe.create({
      data: {
        name: data.name,
        description: data.description,
        preparationTime: data.preparationTime,
        cookingTime: data.cookingTime,
        servings: data.servings,
        status: RecipeStatus.PUBLISHED,
        userId: user.id,
        // Steps
        steps: {
          create: data.steps.map((instruction, index) => ({
            position: index + 1,
            instruction,
          })),
        },
      },
    });

    // Upsert + lier les ingrédients
    for (const ing of data.ingredients) {
      const ingredient = await upsertIngredient(ing.name);

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
          quantity: ing.quantity ?? null,
          unit: ing.unit ?? null,
        },
      });
    }

    console.log(`  ✅  ${recipe.name}`);
  }

  console.log(`\n🎉  ${recipes.length} recettes créées avec succès !\n`);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => prisma.$disconnect());