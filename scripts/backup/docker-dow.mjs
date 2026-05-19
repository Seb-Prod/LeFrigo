import { execSync } from "child_process";

console.log("🐳 Stopping MySQL...");
execSync("docker compose -f docker/mysql/docker-compose.yml down", {
  stdio: "inherit",
});
console.log("✅ MySQL arrêté");