Voici le prompt à conserver :

Contexte LeFrigo — évolution du schéma Prisma
LeFrigo est une app de meal planning familial. Voici les décisions prises :
Recettes (Recipe)

Globales à l'app, visibles par tous les utilisateurs
Créées par un User (créateur)
Statut à prévoir : publiée / en attente de modération
Les ingrédients et étapes de préparation viendront dans une V2

Foyers (Household)

Un user peut appartenir à plusieurs foyers
Rôles : OWNER (tous les droits), MEMBER (modifier/voter), VIEWER (lecture + voter)
Créé automatiquement à l'inscription (le user devient OWNER)

Menus (MealPlan)

Période flexible définie par l'OWNER (startDate / endDate)
Granularité interne : jour + MealType (LUNCH/DINNER)
But final : générer une liste de courses pour la période
Statut : VOTING → CONFIRMED → ARCHIVED
L'OWNER a le dernier mot pour valider le menu final

Votes

Tout le monde vote (OWNER, MEMBER, VIEWER)
Un membre peut voter pour plusieurs recettes dans une période
Pas de double vote pour la même recette (@@unique([userId, mealPlanId, recipeId]))

Recettes candidates — deux modes au choix de l'OWNER

Mode libre — toutes les recettes de l'app sont candidates
Mode liste — l'OWNER constitue une liste restreinte réutilisable (HouseholdRecipeList)

Option activable : les membres peuvent suggérer 1 nouvelle recette par période (RecipeSuggestion)
La suggestion est soumise à validation de l'OWNER avant d'entrer dans le vote
Si validée, elle intègre la liste permanente du foyer



MealPlanSlot — décision UX non encore prise :

Option A : vote sur toute la période, l'OWNER compose ensuite le planning slot par slot
Option B : vote par slot (jour + repas précis)
Modéliser de façon flexible pour supporter les deux

Schéma actuel
prisma// [coller ici le contenu de schema.prisma au moment où tu relances ce chantier]
Ce qui reste à modéliser

Household, HouseholdMember, HouseholdRecipeList, RecipeSuggestion
Mettre à jour Recipe (statut, relation foyer optionnelle)
MealPlan, MealPlanSlot, MealPlanCandidate, Vote
Enums : HouseholdRole, MealPlanStatus, RecipeStatus
Décider et implémenter la granularité du vote (MealPlanSlot)
V2 : ingrédients, étapes, génération liste de courses


Garde ce prompt avec ton schéma collé dedans quand tu es prêt à reprendre.