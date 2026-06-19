import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";

import { errorMiddleware } from "./middlewares/error.middleware";
import { AppError } from "./core/errors/AppError";
import { startSessionCleanupJob } from "./jobs/session-cleanup.job";
import profileRoutes from "./modules/profile/profile.routes";
import recipeRoutes from "./modules/recipe/routes/recipe.routes";
import ingredientRoutes from "./modules/recipe/routes/ingredient.routes";

const app = express();
app.set("trust proxy", false);
// app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("API started");
});

startSessionCleanupJob();

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
app.use("/profile", profileRoutes);
app.use("/recipes", recipeRoutes);
app.use("/ingredients", ingredientRoutes)


// Error middleware — toujours en dernier
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
app.listen(4000, "0.0.0.0", () => {
  console.log("API running");
});
