import { execSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
console.log("⚙️  Starting API...");
execSync("pnpm --filter @lefrigo/api dev", {
    cwd: ROOT,
    stdio: "inherit",
});
