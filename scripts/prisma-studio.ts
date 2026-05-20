import { spawn } from "child_process";
import { resolve } from "path";

const API_DIR = resolve(process.cwd(), "apps/api");

function main(): void {
  console.log("🗄️  Démarrage de Prisma Studio...");
  console.log("   → http://localhost:5555\n");

  const proc = spawn("npx", ["prisma", "studio"], {
    cwd: API_DIR,
    stdio: "inherit",
    shell: true,
  });

  proc.on("error", (err) => {
    console.error("❌ Erreur au démarrage de Prisma Studio :", err.message);
    process.exit(1);
  });

  proc.on("close", (code) => {
    if (code !== 0) {
      console.error(`❌ Prisma Studio s'est arrêté avec le code ${code}`);
      process.exit(code ?? 1);
    }
  });

  process.on("SIGINT", () => {
    console.log("\n🛑 Arrêt de Prisma Studio...");
    proc.kill("SIGINT");
  });

  process.on("SIGTERM", () => {
    proc.kill("SIGTERM");
  });
}

main();