import { execSync } from "child_process";

console.log("🐳 Starting MySQL...");
execSync("docker compose -f docker/mysql/docker-compose.yml up -d", {
  stdio: "inherit",
});
console.log("✅ MySQL démarré");