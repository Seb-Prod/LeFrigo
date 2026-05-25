import express from "express";
import cors from "cors";
import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import recipeRoutes from "./modules/recipes/recipe.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { AppError } from "./core/errors/AppError";
import mealPlanRoutes from "apps/api/src/modules/meal-plans/meal-plan.routes";

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/health", (_, res) => {
  res.json({ status: "ok", service: "lefrigo-api" });
});

console.log("REGISTER ERROR MIDDLEWARE");
app.get("/test-error", async () => {
  throw new AppError(404, "Erreur de test");
});

// Modules
app.use("/auth", authRoutes);
app.use("/users", authMiddleware, userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/meal-plans", mealPlanRoutes);

// Error middleware — toujours en dernier
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
// app.listen(4000, "0.0.0.0", () => {
//   console.log("API running");
// });
