import { execSync } from "child_process";

const URL = "http://localhost:3000";
const DELAY_MS = 5000;

console.log(`🌍 Opening browser in ${DELAY_MS / 1000}s...`);

setTimeout(() => {
  try {
    execSync(`open ${URL}`);
    console.log(`✅ Navigateur ouvert sur ${URL}`);
  } catch {
    console.warn("⚠️  Impossible d'ouvrir le navigateur automatiquement");
  }
}, DELAY_MS);