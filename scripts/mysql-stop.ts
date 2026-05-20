import { execSync, spawnSync } from "child_process";

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

function main(): void {
  if (!isContainerRunning()) {
    console.log("⚠️  MySQL n'est pas en cours d'exécution.");
    return;
  }

  console.log("🛑 Arrêt de MySQL...");

  const result = spawnSync(
    "docker",
    ["compose", "-f", COMPOSE_FILE, "down"],
    { stdio: "inherit", encoding: "utf-8" }
  );

  if (result.status !== 0) {
    console.error("❌ Échec de l'arrêt de MySQL.");
    process.exit(1);
  }

  console.log("✅ MySQL arrêté.");
}

main();