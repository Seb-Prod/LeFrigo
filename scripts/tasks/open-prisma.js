import { execSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const API = resolve(__dirname, "../../apps/api");
console.log("🗄️  Starting Prisma Studio...");
execSync("pnpm prisma studio", {
    cwd: API,
    stdio: "inherit",
});
