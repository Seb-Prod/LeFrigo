import { execSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
console.log("💻 Opening VSCode...");
try {
    execSync("code .", { cwd: ROOT, stdio: "inherit" });
    console.log("✅ VSCode ouvert");
}
catch {
    console.warn("⚠️  VSCode CLI non disponible (commande 'code' introuvable)");
}
