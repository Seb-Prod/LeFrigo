import { spawnSync } from "child_process";

const platform = process.platform;

function openVSCode(): void {
  console.log("💻 Ouverture de VS Code...");

  switch (platform) {
    case "darwin":
    case "linux": {
      const result = spawnSync("code", ["."], { stdio: "inherit", shell: true });
      if (result.status !== 0) {
        console.error(
          "❌ Impossible d'ouvrir VS Code.\n" +
          "   Assure-toi que la commande 'code' est installée :\n" +
          "   VS Code → Cmd+Shift+P → 'Shell Command: Install code in PATH'"
        );
        process.exit(1);
      }
      break;
    }

    case "win32": {
      const result = spawnSync("code", ["."], {
        stdio: "inherit",
        shell: true,
      });
      if (result.status !== 0) {
        console.error("❌ Impossible d'ouvrir VS Code. Vérifie que 'code' est dans ton PATH.");
        process.exit(1);
      }
      break;
    }

    default:
      console.error(`❌ OS non supporté : ${platform}`);
      process.exit(1);
  }

  console.log("✅ VS Code ouvert !");
}

openVSCode();