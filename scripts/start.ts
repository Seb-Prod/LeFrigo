import { spawn, execSync, spawnSync } from "child_process";
import { resolve } from "path";

const platform = process.platform;
const ROOT_DIR = process.cwd();
const COMPOSE_FILE = "docker/mysql/docker-compose.yml";
const CONTAINER_NAME = "lefrigo-mysql";
const API_DIR = resolve(ROOT_DIR, "apps/api");
const WEB_DIR = resolve(ROOT_DIR, "apps/web");

// ─── Helpers ────────────────────────────────────────────────────────────────

function log(emoji: string, message: string): void {
  console.log(`${emoji}  ${message}`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Docker ─────────────────────────────────────────────────────────────────

function isDockerRunning(): boolean {
  try {
    execSync("docker info", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function openDockerDesktop(): void {
  switch (platform) {
    case "darwin":
      spawn("open", ["-a", "Docker"], { detached: true, stdio: "ignore" }).unref();
      break;
    case "win32":
      spawn("cmd", ["/c", "start", "", "C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe"], {
        detached: true, stdio: "ignore", shell: true,
      }).unref();
      break;
    case "linux":
      execSync("sudo systemctl start docker", { stdio: "inherit" });
      break;
  }
}

async function waitForDocker(timeoutMs = 60_000): Promise<void> {
  const start = Date.now();
  process.stdout.write("⏳  Attente de Docker");
  while (Date.now() - start < timeoutMs) {
    if (isDockerRunning()) { console.log(" ✅"); return; }
    process.stdout.write(".");
    await sleep(2_000);
  }
  console.log("\n❌ Timeout — Docker n'a pas démarré.");
  process.exit(1);
}

// ─── MySQL ───────────────────────────────────────────────────────────────────

function isMySQLRunning(): boolean {
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
  process.stdout.write("⏳  Attente de MySQL");
  while (Date.now() - start < timeoutMs) {
    const result = spawnSync(
      "docker",
      ["exec", CONTAINER_NAME, "mysqladmin", "ping", "-h", "localhost", "--silent"],
      { encoding: "utf-8" }
    );
    if (result.status === 0) { console.log(" ✅"); return; }
    process.stdout.write(".");
    await sleep(2_000);
  }
  console.log("\n❌ Timeout — MySQL n'a pas démarré.");
  process.exit(1);
}

// ─── Navigateur ──────────────────────────────────────────────────────────────

function openUrl(url: string): void {
  switch (platform) {
    case "darwin":
      spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
      break;
    case "win32":
      spawn("cmd", ["/c", "start", "", url], { detached: true, stdio: "ignore", shell: true }).unref();
      break;
    case "linux":
      spawn("xdg-open", [url], { detached: true, stdio: "ignore" }).unref();
      break;
  }
}

// ─── Processus long (API, Web, Prisma) ───────────────────────────────────────

function startProcess(label: string, cmd: string, args: string[], cwd: string) {
  const proc = spawn(cmd, args, { cwd, stdio: "inherit", shell: true });

  proc.on("error", (err) => {
    console.error(`❌ Erreur [${label}] : ${err.message}`);
  });

  proc.on("close", (code) => {
    if (code !== 0) console.error(`❌ [${label}] s'est arrêté avec le code ${code}`);
  });

  return proc;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("\n🎯  Démarrage de LeFrigo...\n");

  // 1. Docker
  if (!isDockerRunning()) {
    log("🐳", "Ouverture de Docker Desktop...");
    openDockerDesktop();
    await waitForDocker();
  } else {
    log("🐳", "Docker déjà en cours d'exécution ✅");
  }

  // 2. MySQL
  if (!isMySQLRunning()) {
    log("🗄️", "Démarrage de MySQL...");
    spawnSync("docker", ["compose", "-f", COMPOSE_FILE, "up", "-d"], { stdio: "inherit" });
    await waitForMySQL();
  } else {
    log("🗄️", "MySQL déjà en cours d'exécution ✅");
  }

  // 3. VS Code
  log("💻", "Ouverture de VS Code...");
  spawnSync("code", ["."], { stdio: "ignore", shell: true });

  // 4. API, Web, Prisma Studio en parallèle
  console.log("\n🚀  Démarrage des services...\n");
  const processes = [
    startProcess("API",           "npm", ["run", "dev"],           API_DIR),
    startProcess("Web",           "npm", ["run", "dev"],           WEB_DIR),
    startProcess("Prisma Studio", "npx", ["prisma", "studio"],     API_DIR),
  ];

  // 5. Navigateur — on attend 8s pour laisser les serveurs démarrer
  log("⏳", "Attente du démarrage des serveurs (8s)...");
  await sleep(8_000);

  const urls = [
    { label: "Web", url: "http://localhost:3000" },
    { label: "API", url: "http://localhost:4000" },
    { label: "Prisma Studio", url: "http://localhost:5555" },
  ];

  log("🔗", "Ouverture du navigateur...");
  for (const { url } of urls) {
    openUrl(url);
    await sleep(500);
  }

  console.log("\n✅  LeFrigo est prêt !\n");

  // Propagation du Ctrl+C à tous les processus enfants
  process.on("SIGINT", () => {
    console.log("\n🛑  Arrêt de tous les services...");
    processes.forEach((p) => p.kill("SIGINT"));
    process.exit(0);
  });
}

main();