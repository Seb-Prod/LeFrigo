import { execSync, spawn } from "child_process";
import { rmSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Helper : lancer un process détaché en arrière-plan
function background(cmd, args, cwd) {
  const child = spawn(cmd, args, {
    cwd,
    stdio: "ignore",
    detached: true,
    shell: true,
  });
  child.unref();
}

// Helper : commande synchrone depuis la racine
function run(cmd) {
  execSync(cmd, { cwd: ROOT, stdio: "inherit" });
}

console.log("🧊 Starting LeFrigo full stack...\n");

// 1. Nettoyage du cache Next.js
console.log("🧹 Cleaning Next.js cache...");
const nextCache = resolve(ROOT, "apps/web/.next");
if (existsSync(nextCache)) {
  rmSync(nextCache, { recursive: true, force: true });
}

// 2. Démarrage Docker (MySQL)
console.log("🐳 Starting Docker...");
run("docker compose -f docker/mysql/docker-compose.yml up -d");

// 3. Prisma Studio (arrière-plan)
console.log("🗄️  Starting Prisma Studio...");
background("pnpm", ["prisma", "studio"], resolve(ROOT, "apps/api"));

// 4. Backend API (arrière-plan)
console.log("⚙️  Starting API...");
background("pnpm", ["dev", "--filter", "@lefrigo/api"], ROOT);

// 5. Frontend (arrière-plan)
console.log("🌐 Starting Web...");
background("pnpm", ["dev", "--filter", "@lefrigo/web"], ROOT);

// 6. Ouvrir VSCode
console.log("💻 Opening VSCode...");
try {
  run("code .");
} catch {
  console.warn("⚠️  VSCode CLI non disponible (commande 'code' introuvable)");
}

// 7. Ouvrir le navigateur (petit délai pour laisser Next.js démarrer)
console.log("🌍 Opening browser in 4s...");
setTimeout(() => {
  try {
    const opener =
      process.platform === "darwin"
        ? "open"
        : process.platform === "win32"
        ? "start"
        : "xdg-open";
    run(`${opener} http://localhost:3000`);
  } catch {
    console.warn("⚠️  Impossible d'ouvrir le navigateur automatiquement");
  }

  console.log("\n✅ LeFrigo is running");
  console.log("   Frontend  → http://localhost:3000");
  console.log("   API       → http://localhost:4000");
  console.log("   Prisma    → http://localhost:5555\n");
}, 4000);