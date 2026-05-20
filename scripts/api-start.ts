import { spawn } from "child_process";
import { resolve } from "path";

const API_DIR = resolve(process.cwd(), "apps/api");

function main(): void {
  console.log("🚀 Démarrage de l'API...");

  const proc = spawn("npm", ["run", "dev"], {
    cwd: API_DIR,
    stdio: "inherit",
    shell: true,
  });

  proc.on("error", (err) => {
    console.error("❌ Erreur au démarrage de l'API :", err.message);
    process.exit(1);
  });

  proc.on("close", (code) => {
    if (code !== 0) {
      console.error(`❌ L'API s'est arrêtée avec le code ${code}`);
      process.exit(code ?? 1);
    }
  });

  process.on("SIGINT", () => {
    console.log("\n🛑 Arrêt de l'API...");
    proc.kill("SIGINT");
  });

  process.on("SIGTERM", () => {
    proc.kill("SIGTERM");
  });
}

main();