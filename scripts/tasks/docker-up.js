import { execSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
console.log("🐳 Starting Docker (MySQL)...");
execSync("docker compose -f docker/mysql/docker-compose.yml up -d", {
    cwd: ROOT,
    stdio: "inherit",
});
console.log("✅ MySQL démarré");
