import { spawn } from "child_process";

const platform = process.platform;

const URLS = [
  { label: "🌐 Web (Next.js)", url: "http://localhost:3000" },
  { label: "🚀 API (Express)", url: "http://localhost:4000" },
  { label: "🗄️  Prisma Studio", url: "http://localhost:5555" },
];

function openUrl(url: string): void {
  switch (platform) {
    case "darwin":
      spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
      break;
    case "win32":
      spawn("cmd", ["/c", "start", "", url], {
        detached: true,
        stdio: "ignore",
        shell: true,
      }).unref();
      break;
    case "linux":
      spawn("xdg-open", [url], { detached: true, stdio: "ignore" }).unref();
      break;
    default:
      console.error(`❌ OS non supporté : ${platform}`);
      process.exit(1);
  }
}

async function main(): Promise<void> {
  console.log("🔗 Ouverture des URLs dans le navigateur...\n");

  for (const { label, url } of URLS) {
    console.log(`  ${label} → ${url}`);
    openUrl(url);
    // Petit délai pour éviter que les onglets s'ouvrent tous en même temps
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("\n✅ Tous les onglets sont ouverts !");
}

main();