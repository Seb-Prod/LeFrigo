import { spawnSync } from "child_process";
import { execSync } from "child_process";

const COMPOSE_FILE = "docker/mysql/docker-compose.yml";
const CONTAINER_NAME = "lefrigo-mysql";

function isContainerRunning(): boolean {
  try {
    const result = execSync(
      `docker ps --filter "name=${CONTAINER_NAME}" --filter "status=running" --format "{{.Names}}"`,
      { encoding: "utf-8" }
    );
    return result.trim() === CONTAINER_NAME;
  } catch {
    return false;
  }
}

async function waitForMySQL(timeoutMs = 60_000): Promise<void> {
  const start = Date.now();
  process.stdout.write("⏳ Attente de MySQL");

  while (Date.now() - start < timeoutMs) {
    try {
      const result = spawnSync(
        "docker",
        ["exec", CONTAINER_NAME, "mysqladmin", "ping", "-h", "localhost", "--silent"],
        { encoding: "utf-8" }
      );
      if (result.status === 0) {
        console.log("\n✅ MySQL est prêt !");
        return;
      }
    } catch {
      // pas encore prêt
    }
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 2_000));
  }

  console.log("\n⚠️  Timeout — MySQL n'a pas redémarré dans les temps.");
  process.exit(1);
}

async function main(): Promise<void> {
  // Stop
  if (isContainerRunning()) {
    console.log("🛑 Arrêt de MySQL...");
    const stop = spawnSync("docker", ["compose", "-f", COMPOSE_FILE, "down"], {
      stdio: "inherit",
      encoding: "utf-8",
    });
    if (stop.status !== 0) {
      console.error("❌ Échec de l'arrêt de MySQL.");
      process.exit(1);
    }
  } else {
    console.log("⚠️  MySQL n'était pas en cours d'exécution, démarrage direct...");
  }

  // Start
  console.log("🗄️  Redémarrage de MySQL...");
  const start = spawnSync("docker", ["compose", "-f", COMPOSE_FILE, "up", "-d"], {
    stdio: "inherit",
    encoding: "utf-8",
  });

  if (start.status !== 0) {
    console.error("❌ Échec du démarrage de MySQL.");
    process.exit(1);
  }

  await waitForMySQL();
}

main();