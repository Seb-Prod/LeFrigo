import { spawn } from "child_process";
import { resolve } from "path";

const WEB_DIR = resolve(process.cwd(), "apps/web");

function main(): void {
  console.log("🌐 Démarrage du web...");

  const proc = spawn("npm", ["run", "dev"], {
    cwd: WEB_DIR,
    stdio: "inherit",
    shell: true,
  });

  proc.on("error", (err) => {
    console.error("❌ Erreur au démarrage du web :", err.message);
    process.exit(1);
  });

  proc.on("close", (code) => {
    if (code !== 0) {
      console.error(`❌ Le web s'est arrêté avec le code ${code}`);
      process.exit(code ?? 1);
    }
  });

  process.on("SIGINT", () => {
    console.log("\n🛑 Arrêt du web...");
    proc.kill("SIGINT");
  });

  process.on("SIGTERM", () => {
    proc.kill("SIGTERM");
  });
}

main();