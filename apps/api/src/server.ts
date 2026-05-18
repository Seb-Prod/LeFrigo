import express from "express";
import cors from "cors";
import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import { authMiddleware } from "./middlewares/autj.middleware";

const app = express();

app.use(cors());
app.use(express.json());

// Healthcheck SaaS
app.get("/health", (_, res) => {
  res.json({ status: "ok", service: "lefrigo-api" });
});

// Modules
app.use("/auth", authRoutes);
app.use("/users", authMiddleware, userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
