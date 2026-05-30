import cron from "node-cron";
import { sessionRepository } from "../modules/sessions/session.repository";

export function startSessionCleanupJob() {
  cron.schedule("0 * * * *", async () => {
    console.log("🧹 Nettoyage des sessions...");

    const result =
      await sessionRepository.deleteExpiredSessions();

    console.log(
      `✅ ${result.count} sessions supprimées`,
    );
  });
}