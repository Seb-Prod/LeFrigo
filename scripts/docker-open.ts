import { execSync, spawn } from "child_process";

const platform = process.platform;

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
        detached: true,
        stdio: "ignore",
        shell: true,
      }).unref();
      break;
    case "linux":
      // Sur Linux, Docker Desktop est optionnel — on démarre juste le daemon
      execSync("sudo systemctl start docker", { stdio: "inherit" });
      return;
    default:
      console.error(`❌ OS non supporté : ${platform}`);
      process.exit(1);
  }
}

async function waitForDocker(timeoutMs = 60_000): Promise<void> {
  const start = Date.now();
  process.stdout.write("⏳ Attente de Docker");

  while (Date.now() - start < timeoutMs) {
    if (isDockerRunning()) {
      console.log("\n✅ Docker est prêt !");
      return;
    }
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 2_000));
  }

  console.log("\n⚠️  Timeout — Docker n'a pas démarré dans les temps.");
  process.exit(1);
}

async function main(): Promise<void> {
  if (isDockerRunning()) {
    console.log("✅ Docker est déjà en cours d'exécution.");
    return;
  }

  console.log("🐳 Ouverture de Docker Desktop...");
  openDockerDesktop();
  await waitForDocker();
}

main();