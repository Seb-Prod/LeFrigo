import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { prisma } from "./lib/prisma";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ ok: true });
});

app.get("/db-test", async (_, res) => {

  const users = await prisma.user.findMany();

  res.json(users);

});

app.use("/users", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});