# API — Recettes (`/recipes`)

Documentation des routes exposées par `recipe.routes.ts`, `recipe.controller.ts`, `recipe.service.ts` et `recipe.query.repository.ts`.

Base path : `/recipes`

---

## Sommaire

- [Lecture publique](#lecture-publique)
  - [`GET /recipes`](#get-recipes)
  - [`GET /recipes/random`](#get-recipesrandom)
  - [`GET /recipes/:id`](#get-recipesid)
- [Lecture authentifiée](#lecture-authentifiée)
  - [`GET /recipes/me`](#get-recipesme)
  - [`GET /recipes/me/count`](#get-recipesmecount)
- [Écriture authentifiée](#écriture-authentifiée)
  - [`POST /recipes`](#post-recipes)
  - [`PUT /recipes/:id`](#put-recipesid)
- [Modèles de réponse](#modèles-de-réponse)
- [Codes d'erreur](#codes-derreur)
- [⚠️ Bugs connus](#️-bugs-connus)

---

## Lecture publique

### `GET /recipes`

Recherche paginée de recettes publiées, avec filtres et tri.

**Auth** : aucune.

**Query params**

| Param                | Type     | Défaut       | Description                                                              |
| --------------------- | -------- | ------------ | -------------------------------------------------------------------------- |
| `page`                | `number` | `1`          | Numéro de page.                                                          |
| `limit`               | `number` | `10`         | Nombre de résultats par page.                                            |
| `maxPreparationTime`  | `number` | —            | Filtre : temps de préparation ≤ valeur (minutes).                        |
| `maxCookingTime`      | `number` | —            | Filtre : temps de cuisson ≤ valeur (minutes).                            |
| `maxTotalTime`        | `number` | —            | Filtre : temps total ≤ valeur (minutes).                                 |
| `search`              | `string` | —            | Recherche texte sur `name` et `description` (`contains`, insensible à la casse selon config MySQL). |
| `sort`                | `string` | `createdAt` (tri desc implicite si absent) | Champ de tri. Valeurs possibles : `createdAt`, `name`, `preparationTime`, `cookingTime`, `totalTime`. |
| `order`               | `"asc" \| "desc"` | `asc`  | Sens du tri (ignoré si `sort` absent — le tri par défaut est `createdAt desc`). |

**Filtre implicite** : seules les recettes avec `status = "PUBLISHED"` et `deletedAt = null` sont retournées.

**Réponse** `200` — [`PaginatedRecipes`](#paginatedrecipes) de `SafeRecipeSummary[]`

```http
GET /recipes?maxTotalTime=30&sort=name&order=asc&page=1&limit=12
```

---

### `GET /recipes/random`

Retourne des recettes publiées aléatoires (tirage SQL via `ORDER BY RAND()`).

**Auth** : aucune.

**Query params**

| Param   | Type     | Défaut                        | Description               |
| ------- | -------- | ------------------------------ | -------------------------- |
| `limit` | `number` | `config.recipes.randomLimit`  | Nombre de recettes à retourner. |

**Réponse** `200` — `SafeRecipeSummary[]`

```http
GET /recipes/random?limit=6
```

---

### `GET /recipes/:id`

Retourne une recette complète (ingrédients, étapes, auteur…) par son ID.

**Auth** : aucune.

**Réponse**

- `200` — [`SafeRecipe`](#saferecipe)
- `400` `{ message: "ID invalide" }` si `id` absent ou tableau
- `404` `RECIPE_NOT_FOUND` si la recette n'existe pas ou est supprimée (`deletedAt`)

```http
GET /recipes/64f1c2...
```

---

## Lecture authentifiée

### `GET /recipes/me`

Liste paginée des recettes de l'utilisateur connecté (toutes, quel que soit le `status`).

**Auth** : requise (`authMiddleware`).

**Query params**

| Param   | Type     | Défaut | Description                |
| ------- | -------- | ------ | ---------------------------- |
| `page`  | `number` | `1`    | Numéro de page.             |
| `limit` | `number` | `10`   | Résultats par page.         |

**Réponse**

- `200` — [`PaginatedRecipes`](#paginatedrecipes) de `SafeRecipeSummary[]`
- `401` `{ message: "Non authentifié" }`

```http
GET /recipes/me?page=2&limit=20
Authorization: Bearer <token>
```

---

### `GET /recipes/me/count`

Nombre total de recettes de l'utilisateur connecté.

**Auth** : requise.

**Réponse**

- `200` — `{ count: number }`
- `401` `{ message: "Non authentifié" }`

---

## Écriture authentifiée

### `POST /recipes`

Crée une recette pour l'utilisateur connecté.

**Auth** : requise. L'utilisateur doit exister et avoir le statut `ACTIVE`.

**Body** : validé par `createRecipeSchema` (Zod, `@lefrigo/shared`).

**Réponse**

- `201` — [`SafeRecipe`](#saferecipe) créée (avec étapes et ingrédients)
- `401` `{ message: "Non authentifié" }`
- `400` `{ message: "Données invalides", errors: ZodIssue[] }`
- `404` `USER_NOT_FOUND`
- `403` `ACCOUNT_INACTIVE`

---

### `PUT /recipes/:id`

Met à jour une recette existante. Seul le propriétaire peut la modifier.

**Auth** : requise.

**Body** : validé par `createRecipeSchema`.

**Réponse**

- `200` — [`SafeRecipe`](#saferecipe) mise à jour
- `401` `{ message: "Non authentifié" }`
- `400` `{ message: "Données invalides", errors: ZodIssue[] }`
- `404` `RECIPE_NOT_FOUND`
- `403` `FORBIDDEN` si l'utilisateur n'est pas l'auteur de la recette

---

## Modèles de réponse

### `PaginatedRecipes`

```ts
type PaginatedRecipes = {
  recipes: SafeRecipeSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number; // Math.ceil(total / limit)
};
```

### `SafeRecipe` / `SafeRecipeSummary`

Définis dans `@lefrigo/shared` et produits par les sérialiseurs `toSafeRecipe` / `toSafeRecipeSummary`. `SafeRecipe` inclut le détail complet (`RECIPE_FULL_INCLUDE`) ; `SafeRecipeSummary` est une version allégée (`RECIPE_SUMMARY_INCLUDE`) utilisée pour les listes.

---

## Codes d'erreur

| Code | Clé                | Origine                                            |
| ---- | ------------------- | ---------------------------------------------------- |
| 401  | —                    | Route authentifiée sans utilisateur (`req.user`)     |
| 400  | —                    | Body invalide (Zod) ou `id` de route invalide        |
| 403  | `ACCOUNT_INACTIVE`   | Création : compte utilisateur non `ACTIVE`           |
| 403  | `FORBIDDEN`          | Update : utilisateur non propriétaire de la recette  |
| 404  | `USER_NOT_FOUND`     | Création : utilisateur introuvable                   |
| 404  | `RECIPE_NOT_FOUND`   | `getById` / `update` : recette introuvable ou supprimée |

---

## ⚠️ Bugs connus

Repérés en documentant le comportement réel du code — à corriger si besoin, non modifiés ici pour rester fidèle au code existant :

1. ~~`GET /recipes` — page par défaut incorrecte (`2` au lieu de `1`).~~ **Corrigé.**
2. ~~`GET /recipes` — variables mortes (`page`, `limit`, `maxPrepTime`).~~ **Corrigé.**
3. ~~`GET /recipes` — types de query params incohérents (`maxCookingTime`, `maxTotalTime`, `search` non-optionnels).~~ **Corrigé.**
4. ~~`PUT /recipes/:id` — retournait `201` au lieu de `200`.~~ **Corrigé.**
5. ~~Routes `quick-prep` / `quick-meal` absentes.~~ **Résolu** — ces routes ne sont plus nécessaires : le frontend utilise désormais `GET /recipes` (`find`) avec les filtres `maxPreparationTime`/`maxTotalTime` pour couvrir ces cas d'usage. Les méthodes `getQuickPrep`/`getQuickMeal` de `recipe.service.ts` (frontend) sont à retirer si ce n'est pas déjà fait.

Tous les points sont désormais résolus côté backend. Cette section peut être supprimée du README une fois `getQuickPrep`/`getQuickMeal` nettoyées côté frontend.